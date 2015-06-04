define(["require", "exports", "knockout", "CockpitPortal", "Managers/Navigation"], function (require, exports, knockout, CockpitPortal, Navigation) {
    var Experiment = (function () {
        function Experiment() {
            this.IsReady = knockout.observable(false);
            this.NumberOfSlides = knockout.observable(0);
            this.Title = knockout.observable("");
            this.CloseSlides = knockout.observable(false);
            this.FooterLabel = knockout.observable(null);
            this.SlideName = knockout.observable("slide");
        }
        Experiment.prototype.Load = function (id) {
            var _this = this;
            this._id = id;
            if (this.IsReady())
                this.IsReady(false);
            CockpitPortal.Experiment.Get(this._id).WithCallback(function (response) {
                if (response.Error != null)
                    throw new Error("Failed to load Experiment: " + response.Error.Message);
                if (response.Body.Results.length === 0)
                    throw new Error("No Experiment data retuened");
                var config = response.Body.Results[0];
                _this.CloseSlides(config.LockQuestion);
                _this.FooterLabel(config.FooterLabel);
                _this.IsReady(true);
            });
        };
        Experiment.prototype.LoadSlide = function (index, callback) {
            var _this = this;
            CockpitPortal.Question.Get(this._id, index).WithCallback(function (response) {
                if (response.Error != null) {
                    if (response.Error.Fullname === "Chaos.Cockpit.Core.Core.Exceptions.SlideClosedException") {
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
                callback(response.Body.Results);
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
            CockpitPortal.Slide.Close(this._id, index).WithCallback(function (response) {
                if (response.Error != null)
                    throw new Error("Failed to close slide: " + response.Error.Message);
            });
        };
        return Experiment;
    })();
    var instance = new Experiment();
    return instance;
});
