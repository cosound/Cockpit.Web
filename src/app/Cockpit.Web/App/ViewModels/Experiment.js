define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var Experiment = (function () {
        function Experiment() {
            this.Name = knockout.observable();
        }
        return Experiment;
    })();
    exports.Experiment = Experiment;
});
