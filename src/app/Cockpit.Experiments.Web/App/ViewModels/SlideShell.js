define(["require", "exports", "knockout", "ExperimentManager", "ViewModels/NavigationPage", "Navigation"], function(require, exports, knockout, ExperimentManager, NavigationPage, Navigation) {
    var SlideShell = (function () {
        function SlideShell(data) {
            var _this = this;
            this.Name = knockout.observable();
            this.Slide = knockout.observable();
            this.CanGoToNextSlide = knockout.observable(false);
            this._slideId = data.SlideId;
            this._slideIdSubscription = this._slideId.subscribe(function (id) {
                return _this.LoadSlide(id);
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
            Navigation.Navigate("Experiment/7/" + (this._slideId() + 1));
        };

        SlideShell.prototype.LoadExperiment = function () {
            var experiement = ExperimentManager.Experiment();
            this.Name(experiement.Name);
            this.LoadSlide(this._slideId());
        };

        SlideShell.prototype.LoadSlide = function (id) {
            var experiement = ExperimentManager.Experiment();
            var slide = experiement.Slides[id];

            this.Slide(new NavigationPage("Slides-" + slide.Type, { Slide: slide, CanGoToNextSlide: this.CanGoToNextSlide }));
        };

        SlideShell.prototype.CleanExperimentLoaded = function () {
            this._experimentLoadedSubscription.dispose();
            this._experimentLoadedSubscription = null;
        };

        SlideShell.prototype.dispose = function () {
            if (this._experimentLoadedSubscription)
                this.CleanExperimentLoaded();

            this._slideIdSubscription.dispose();
            this._slideIdSubscription = null;
        };
        return SlideShell;
    })();

    
    return SlideShell;
});
//# sourceMappingURL=SlideShell.js.map
