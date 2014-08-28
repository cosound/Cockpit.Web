define(["require", "exports", "Navigation", "ViewModels/Experiments/ExperimentManager"], function(require, exports, Navigation, ExperimentManager) {
    var Experiments = (function () {
        function Experiments(experimentId) {
            this.Experiments = ExperimentManager.Experiments;

            console.log("Load Experiment: " + experimentId);
        }
        Experiments.prototype.CreateExperiment = function () {
            Navigation.Navigate("CreateExperiment");
        };
        return Experiments;
    })();

    
    return Experiments;
});
