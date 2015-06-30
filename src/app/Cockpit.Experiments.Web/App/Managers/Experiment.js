define(["require", "exports", "knockout", "CockpitPortal", "Managers/Navigation", "Managers/Title", "Managers/Notification", "Managers/CallRepeater"], function (require, exports, knockout, CockpitPortal, Navigation, Title, Notification, CallRepeater) {
    var Experiment = (function () {
        function Experiment() {
            var _this = this;
            this.IsReady = knockout.observable(false);
            this.CurrentSlideIndex = knockout.observable(0);
            this.NumberOfSlides = knockout.observable(0);
            this.IsExperimentCompleted = knockout.observable(false);
            this.Title = knockout.observable("");
            this.SlideTitle = knockout.observable("");
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
            this.Title.subscribe(function (title) { return Title.ToDefault(title == "" ? null : title); });
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
                if (response.Error != null) {
                    Notification.Error("Failed to load Experiment: " + response.Error.Message);
                    Navigation.Navigate("ExperimentNotFound/" + id);
                    return;
                }
                if (response.Body.Results.length === 0) {
                    Navigation.Navigate("ExperimentNotFound/" + id);
                    Notification.Error("No Experiment data retuened");
                    return;
                }
                var config = response.Body.Results[0];
                _this.Title(config.Name);
                _this.CloseSlidesEnabled(config.LockQuestion);
                _this.GoToPreviousSlideEnabled(config.EnablePrevious);
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
                    if (response.Error.Fullname === "Chaos.Cockpit.Core.Core.Exceptions.SlideLockedException")
                        Navigation.Navigate("SlideLocked");
                    else if (response.Error.Message === "No Questionaire found by that Id")
                        Navigation.Navigate("ExperimentNotFound/" + _this._id);
                    else
                        Notification.Error("Failed to get slide: " + response.Error.Message);
                    return;
                }
                if (response.Body.Count === 0) {
                    Notification.Error("No slide returned");
                    return;
                }
                _this.NumberOfSlides(response.Body.FoundCount);
                _this._hasLoadedCurrentSlide = true;
                _this.CurrentSlideIndex(index);
                callback(index, response.Body.Results);
            });
        };
        Experiment.prototype.SaveQuestionAnswer = function (id, answer, callback) {
            new CallRepeater(function (c) {
                CockpitPortal.Answer.Set(id, answer).WithCallback(function (response) {
                    if (response.Error != null) {
                        if (response.Error.Fullname !== "Chaos.Cockpit.Core.Core.Exceptions.ValidationException") {
                            c(false, false);
                            Notification.Error("Failed to save answer: " + response.Error.Message);
                        }
                        else
                            c(false, true);
                    }
                    else
                        c(true, false);
                });
            }, callback);
        };
        Experiment.prototype.CloseSlide = function (index) {
            CockpitPortal.Slide.Completed(this._id, index).WithCallback(function (response) {
                if (response.Error != null)
                    Notification.Error("Failed to close slide: " + response.Error.Message);
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
