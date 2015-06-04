define(["require", "exports", "knockout", "CockpitPortal", "Managers/Navigation", "Configuration"], function (require, exports, knockout, CockpitPortal, Navigation, Configuration) {
    exports.IsReady = knockout.observable(false);
    exports.NumberOfSlides = knockout.observable(0);
    exports.Title = knockout.observable("");
    var _id;
    function Load(id) {
        _id = id;
        if (exports.IsReady())
            exports.IsReady(false);
        CockpitPortal.Experiment.Get(_id).WithCallback(function (response) {
            if (response.Error != null)
                throw new Error("Failed to load Experiment: " + response.Error.Message);
            if (response.Body.Results.length === 0)
                throw new Error("No Experiment data retuened");
            var config = response.Body.Results[0];
            Configuration.CloseSlides = config.LockQuestion;
            Configuration.FooterLabel(config.FooterLabel);
            exports.IsReady(true);
        });
    }
    exports.Load = Load;
    function LoadSlide(index, callback) {
        CockpitPortal.Question.Get(_id, index).WithCallback(function (response) {
            if (response.Error != null) {
                if (response.Error.Fullname === "Chaos.Cockpit.Core.Core.Exceptions.SlideClosedException") {
                    Navigation.Navigate("SlideLocked");
                    return;
                }
                else if (response.Error.Message === "No Questionaire found by that Id") {
                    Navigation.Navigate("ExperimentNotFound/" + _id);
                    return;
                }
                else
                    throw new Error("Failed to get slide: " + response.Error.Message);
            }
            if (response.Body.Count === 0)
                throw new Error("No slide returned");
            exports.NumberOfSlides(response.Body.FoundCount);
            callback(response.Body.Results);
        });
    }
    exports.LoadSlide = LoadSlide;
    function SaveQuestionAnswer(id, answer, callback) {
        CockpitPortal.Answer.Set(id, answer).WithCallback(function (response) {
            callback();
            if (response.Error != null)
                throw new Error("Failed to save answer: " + response.Error.Message);
        });
    }
    exports.SaveQuestionAnswer = SaveQuestionAnswer;
    function CloseSlide(index) {
        CockpitPortal.Slide.Close(_id, index).WithCallback(function (response) {
            if (response.Error != null)
                throw new Error("Failed to close slide: " + response.Error.Message);
        });
    }
    exports.CloseSlide = CloseSlide;
});
