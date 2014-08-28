define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var Experiment = (function () {
        function Experiment() {
            this.Id = knockout.observable();
            this.Name = knockout.observable();
            this.Participants = knockout.observableArray();
            this.Configuration = knockout.observable();
            this.IsSelected = knockout.observable(false);
        }
        Experiment.prototype.Select = function () {
            this.IsSelected(true);

            if (this.SelectorCallback != null)
                this.SelectorCallback(this);
        };
        return Experiment;
    })();

    
    return Experiment;
});
