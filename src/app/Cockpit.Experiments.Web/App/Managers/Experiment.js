define(["require", "exports", "knockout", "CockpitPortal", "Managers/Navigation"], function (require, exports, knockout, CockpitPortal, Navigation) {
    exports.IsReady = knockout.observable(false);
    exports.NumberOfSlides = knockout.observable(0);
    exports.Title = knockout.observable("");
    var _id;
    function SetId(id) {
        _id = id;
        if (exports.IsReady())
            exports.IsReady(false);
        exports.IsReady(true);
    }
    exports.SetId = SetId;
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
