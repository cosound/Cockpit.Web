define(["require", "exports", "knockout", "ExperimentManager", "ViewModels/NavigationPage"], function(require, exports, knockout, ExperimentManager, NavigationPage) {
    var SlideShell = (function () {
        function SlideShell() {
            var _this = this;
            this.Name = knockout.observable();
            this.Slide = knockout.observable();
            this.CanGoToNextSlide = knockout.observable(false);
            this.SlideNumber = knockout.observable(0);
            this.NumberOfSlides = knockout.observable(0);
            this.AreFooterControlsVisible = knockout.observable(true);
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

            ExperimentManager.SaveSlideData(this.SlideNumber(), this.Slide().Data().UserInput());

            this.SlideNumber(this.SlideNumber() + 1);

            this.LoadSlide(this.SlideNumber());
        };

        SlideShell.prototype.LoadExperiment = function () {
            this._experiment = ExperimentManager.Experiment();
            this.Name(this._experiment.Name);
            this.NumberOfSlides(this._experiment.Slides.length);
            this.LoadSlide(0);
        };

        SlideShell.prototype.LoadSlide = function (index) {
            var slide;

            this.SlideNumber(index + 1);

            if (index < this._experiment.Slides.length)
                slide = this._experiment.Slides[index];
            else {
                this.AreFooterControlsVisible(false);
            }

            this.Slide(new NavigationPage("Slides-" + slide, { Slide: slide, CanGoToNextSlide: this.CanGoToNextSlide, UserInput: knockout.observable(null) }));
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
