define(["require", "exports", "knockout"], function(require, exports, knockout) {
    exports.ExperimentLoaded = knockout.observable(false);

    function LoadExperiment(id) {
        exports.ExperimentLoaded(true);
    }
    exports.LoadExperiment = LoadExperiment;
});
//# sourceMappingURL=ExperimentMananger.js.map
