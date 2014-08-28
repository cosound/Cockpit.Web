define(["require", "exports", "Navigation", "ViewModels/Experiments/ExperimentManager"], function(require, exports, Navigation, ExperimentManager) {
    var Experiments = (function () {
        function Experiments(experimentId) {
            var _this = this;
            this.Experiments = ExperimentManager.Experiments;

            this.HookupExperiments();
            this.Experiments().forEach(function (e) {
                if (e.Id() == experimentId)
                    e.IsSelected(true);
            });
            this._experimentChangeSubscription = this.Experiments.subscribe(function (e) {
                return _this.ExperimentsChanged(e);
            });
        }
        Experiments.prototype.CreateExperiment = function () {
            Navigation.Navigate("CreateExperiment");
        };

        Experiments.prototype.dispose = function () {
            this.Experiments().forEach(function (e) {
                e.SelectorCallback = null;
            });
            this._experimentChangeSubscription.dispose();
        };

        Experiments.prototype.HookupExperiments = function () {
            var _this = this;
            this.Experiments().forEach(function (e) {
                return e.SelectorCallback = function (ex) {
                    return _this.ExperimentSelected(ex);
                };
            });
        };

        Experiments.prototype.ExperimentsChanged = function (value) {
            this.HookupExperiments();
        };

        Experiments.prototype.ExperimentSelected = function (experiment) {
            console.log("sdfsdfd");
            this.Experiments().forEach(function (e) {
                if (e != experiment && e.IsSelected())
                    e.IsSelected(false);
            });
        };
        return Experiments;
    })();

    
    return Experiments;
});
