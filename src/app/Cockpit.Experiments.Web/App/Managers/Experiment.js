define(["require", "exports", "knockout", "CockpitPortal", "Managers/Navigation"], function (require, exports, knockout, CockpitPortal, Navigation) {
    var Experiment = (function () {
        function Experiment() {
            var _this = this;
            this.IsReady = knockout.observable(false);
            this.CurrentSlideIndex = knockout.observable(0);
            this.NumberOfSlides = knockout.observable(0);
            this.IsExperimentCompleted = knockout.observable(false);
            this.Title = knockout.observable("");
            this.FooterLabel = knockout.observable(null);
            this.StyleSheet = knockout.observable(null);
            this.CompletedUrl = knockout.observable(null);
            this.ScrollToInvalidAnswerDuration = 2000;
            this.CloseSlidesEnabled = knockout.observable(false);
            this.GoToPreviousSlideEnabled = knockout.observable(true);
            this._hasLoadedCurrentSlide = false;
            this._listExperiments = {};
            this.StyleSheet.subscribe(function (path) {
                if (_this._styleSheetElement != null)
                    document.head.removeChild(_this._styleSheetElement);
                if (path != null) {
                    _this._styleSheetElement = document.createElement("link");
                    _this._styleSheetElement.rel = "stylesheet";
                    _this._styleSheetElement.type = "text/css";
                    _this._styleSheetElement.href = path;
                    document.head.appendChild(_this._styleSheetElement);
                }
            });
            this.CloseExperimentEnabled = knockout.computed(function () { return _this.CompletedUrl() != null; });
            Navigation.ExperimentId.subscribe(function (id) {
                if (id != null)
                    _this.Load(id);
            });
            Navigation.ExperimentListId.subscribe(function (id) {
                if (id != null)
                    _this.LoadNext(id);
            });
            if (Navigation.ExperimentId() != null)
                this.Load(Navigation.ExperimentId());
            else if (Navigation.ExperimentListId() != null)
                this.LoadNext(Navigation.ExperimentListId());
        }
        Experiment.prototype.ExperimentCompleted = function () {
            this.IsExperimentCompleted(true);
        };
        Experiment.prototype.Load = function (id) {
            var _this = this;
            this._id = id;
            this.IsReady(false);
            this._hasLoadedCurrentSlide = false;
            CockpitPortal.Experiment.Get(this._id).WithCallback(function (response) {
                if (response.Error != null)
                    throw new Error("Failed to load Experiment: " + response.Error.Message);
                if (response.Body.Results.length === 0)
                    throw new Error("No Experiment data retuened");
                var config = response.Body.Results[0];
                _this.CloseSlidesEnabled(config.LockQuestion);
                _this.GoToPreviousSlideEnabled(config.EnablePrevious || true);
                _this.FooterLabel(config.FooterLabel);
                _this.CurrentSlideIndex(config.CurrentSlideIndex);
                _this.IsExperimentCompleted(false);
                _this.StyleSheet(config.Css);
                _this.CompletedUrl(config.RedirectOnCloseUrl);
                _this.IsReady(true);
            });
        };
        Experiment.prototype.LoadNext = function (listId) {
            var _this = this;
            if (this._listExperiments[listId]) {
                Navigation.Navigate("Experiment/" + this._listExperiments[listId]);
                return;
            }
            CockpitPortal.Experiment.Next(listId).WithCallback(function (response) {
                if (response.Error != null) {
                    Navigation.Navigate("NoMoreExperiments");
                    return;
                }
                if (response.Body.Results.length === 0)
                    Navigation.Navigate("NoMoreExperiments");
                else {
                    _this._listExperiments[listId] = response.Body.Results[0].Id;
                    Navigation.Navigate("Experiment/" + response.Body.Results[0].Id);
                }
            });
        };
        Experiment.prototype.LoadNextSlide = function (callback) {
            this.LoadSlide(this.CurrentSlideIndex() + (this._hasLoadedCurrentSlide ? 1 : 0), callback);
        };
        Experiment.prototype.LoadPreviousSlide = function (callback) {
            this.LoadSlide(this.CurrentSlideIndex() + -1, callback);
        };
        Experiment.prototype.LoadSlide = function (index, callback) {
            var _this = this;
            CockpitPortal.Question.Get(this._id, index).WithCallback(function (response) {
                if (response.Error != null) {
                    if (response.Error.Fullname === "Chaos.Cockpit.Core.Core.Exceptions.SlideLockedException") {
                        Navigation.Navigate("SlideLocked");
                        return;
                    }
                    else if (response.Error.Message === "No Questionaire found by that Id") {
                        Navigation.Navigate("ExperimentNotFound/" + _this._id);
                        return;
                    }
                    else
                        throw new Error("Failed to get slide: " + response.Error.Message);
                }
                if (response.Body.Count === 0)
                    throw new Error("No slide returned");
                _this.NumberOfSlides(response.Body.FoundCount);
                _this._hasLoadedCurrentSlide = true;
                _this.CurrentSlideIndex(index);
                callback(index, response.Body.Results);
            });
        };
        Experiment.prototype.SaveQuestionAnswer = function (id, answer, callback) {
            CockpitPortal.Answer.Set(id, answer).WithCallback(function (response) {
                callback();
                if (response.Error != null)
                    throw new Error("Failed to save answer: " + response.Error.Message);
            });
        };
        Experiment.prototype.CloseSlide = function (index) {
            CockpitPortal.Slide.Completed(this._id, index).WithCallback(function (response) {
                if (response.Error != null)
                    throw new Error("Failed to close slide: " + response.Error.Message);
            });
        };
        Experiment.prototype.Close = function () {
            document.location.href = this.CompletedUrl();
        };
        return Experiment;
    })();
    var instance = new Experiment();
    return instance;
});
