define(["require", "exports", "knockout", "ExperimentManager", "Models/SlideData"], function(require, exports, knockout, ExperimentManager, SlideData) {
    var SlideShell = (function () {
        function SlideShell() {
            var _this = this;
            this.Name = knockout.observable();
            this.SlideData = knockout.observable();
            this.SlideIndex = knockout.observable(0);
            this.NumberOfSlides = knockout.observable(0);
            this.CanGoToNextSlide = knockout.observable(false);
            this.AreFooterControlsVisible = knockout.observable(true);
            this.SlideNumber = knockout.computed(function () {
                return _this.SlideIndex() + 1;
            });

            if (ExperimentManager.ExperimentLoaded())
                this.LoadExperiment();
            else {
                this._experimentLoadedSubscription = ExperimentManager.ExperimentLoaded.subscribe(function (l) {
                    _this.CleanExperimentLoaded();
                    _this.LoadExperiment();
                });
            }
        }
        SlideShell.prototype.GoToNextSlide = function () {
            this.CanGoToNextSlide(false);

            ExperimentManager.SaveSlideData(this.SlideIndex(), this.SlideData().UserInput);

            this.LoadSlide(this.SlideIndex() + 1);
        };

        SlideShell.prototype.LoadExperiment = function () {
            this._experiment = ExperimentManager.Experiment();
            this.Name(this._experiment.Name);
            this.NumberOfSlides(this._experiment.Slides.length);
            this.LoadSlide(0);
        };

        SlideShell.prototype.LoadSlide = function (index) {
            this.SlideIndex(index);

            if (index < this._experiment.Slides.length)
                this.SlideData(new SlideData("Slides/Default", this.CanGoToNextSlide, this._experiment.Slides[index]));
            else {
                this.AreFooterControlsVisible(false);
                this.SlideData(new SlideData("Slides/Completed"));
            }
        };

        SlideShell.prototype.CleanExperimentLoaded = function () {
            this._experimentLoadedSubscription.dispose();
            this._experimentLoadedSubscription = null;
        };

        SlideShell.prototype.dispose = function () {
            if (this._experimentLoadedSubscription)
                this.CleanExperimentLoaded();
        };
        return SlideShell;
    })();

    
    return SlideShell;
});
//# sourceMappingURL=SlideShell.js.map
