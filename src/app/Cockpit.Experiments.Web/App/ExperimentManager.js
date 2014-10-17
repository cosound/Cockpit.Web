define(["require", "exports", "knockout", "CockpitPortal"], function(require, exports, knockout, CockpitPortal) {
    exports.Experiment = knockout.observable();
    exports.ExperimentLoaded = knockout.computed(function () {
        return exports.Experiment() != null;
    });
    exports.ExperimentIsLoading = knockout.observable(false);

    function LoadExperiment(id) {
        exports.ExperimentIsLoading(true);
        CockpitPortal.Questionnaire.Get(id).WithCallback(QuestionnaireGetCompleted, this);
    }
    exports.LoadExperiment = LoadExperiment;

    function SaveSlideData(id, data) {
        console.log("Saving data for slide " + id + ": " + data);
    }
    exports.SaveSlideData = SaveSlideData;

    function QuestionnaireGetCompleted(response) {
        if (response.Error != null)
            throw new Error("Failed to get questionnaire: " + response.Error.Message);

        if (response.Body.Count == 0)
            throw new Error("No questionnaire returned");

        exports.Experiment(response.Body.Results[0]);

        exports.ExperimentIsLoading(false);
    }
});
//# sourceMappingURL=ExperimentManager.js.map
