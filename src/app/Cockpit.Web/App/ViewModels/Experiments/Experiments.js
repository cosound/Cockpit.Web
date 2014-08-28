define(["require", "exports", "Navigation"], function(require, exports, Navigation) {
    var Experiments = (function () {
        function Experiments() {
        }
        Experiments.prototype.CreateExperiment = function () {
            Navigation.Navigate("CreateExperiment");
        };
        return Experiments;
    })();

    
    return Experiments;
});
