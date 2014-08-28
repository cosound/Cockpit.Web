define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var Experiment = (function () {
        function Experiment() {
            this.Id = knockout.observable();
            this.Name = knockout.observable();
            this.Participants = knockout.observableArray();
            this.Configuration = knockout.observable();
        }
        return Experiment;
    })();

    
    return Experiment;
});
