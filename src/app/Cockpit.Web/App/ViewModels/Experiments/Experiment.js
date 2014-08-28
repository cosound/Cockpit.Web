define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var Experiment = (function () {
        function Experiment() {
            this.Id = knockout.observable();
            this.Name = knockout.observable();
            this.Participants = knockout.observableArray();
            this.Configuration = knockout.observable();
        }
        Experiment.prototype.Select = function () {
            if (this.SelectorCallback != null)
                this.SelectorCallback(this);
        };
        return Experiment;
    })();

    
    return Experiment;
});
