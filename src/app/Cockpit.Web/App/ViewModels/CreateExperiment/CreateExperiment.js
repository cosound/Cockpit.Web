define(["require", "exports", "knockout", "Navigation", "ViewModels/Experiments/ExperimentManager"], function(require, exports, knockout, Navigation, ExperimentManager) {
    var CreateExperiment = (function () {
        function CreateExperiment() {
            var _this = this;
            this.Name = knockout.observable("");
            this.Emails = knockout.observable("");
            this.Configuration = knockout.observable("");
            this.IsCreating = knockout.observable(false);
            this.CanCreate = knockout.computed(function () {
                return _this.Name() != "" && _this.Emails() != "" && _this.Configuration() != "" && !_this.IsCreating();
            });
        }
        CreateExperiment.prototype.Create = function () {
            var _this = this;
            if (this.IsCreating() || !this.CanCreate())
                return;
            this.IsCreating(true);

            ExperimentManager.CreateExperiment(this.Name(), this.Emails().split(","), this.Configuration(), function (success, experiment) {
                if (success)
                    Navigation.Navigate("Experiments/" + experiment.Id());
                else
                    console.log("Failed to create experiment");

                _this.IsCreating(false);
            });
        };
        return CreateExperiment;
    })();

    
    return CreateExperiment;
});
