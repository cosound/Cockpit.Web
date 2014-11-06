define(["require", "exports", "knockout", "CockpitPortal"], function(require, exports, knockout, CockpitPortal) {
    exports.IsReady = knockout.observable(false);
    exports.NumberOfSlides = knockout.observable(0);

    var _id;

    function SetId(id) {
        _id = id;

        exports.IsReady(true);
    }
    exports.SetId = SetId;

    function LoadSlide(index, callback) {
        CockpitPortal.Question.Get(_id, index).WithCallback(function (response) {
            if (response.Error != null)
                throw new Error("Failed to get slide: " + response.Error.Message);

            if (response.Body.Count == 0)
                throw new Error("No slide returned");

            exports.NumberOfSlides(response.Body.TotalCount);

            callback(response.Body.Results);
        });
    }
    exports.LoadSlide = LoadSlide;

    function SaveQuestionAnswer(id, answer) {
        CockpitPortal.Answer.Set(id, JSON.stringify(answer)).WithCallback(function (response) {
            if (response.Error != null)
                throw new Error("Failed to save answer: " + response.Error.Message);
        });
    }
    exports.SaveQuestionAnswer = SaveQuestionAnswer;
});
//# sourceMappingURL=ExperimentManager.js.map
