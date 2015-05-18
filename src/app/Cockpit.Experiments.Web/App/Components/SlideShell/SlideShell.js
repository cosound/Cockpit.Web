define(["require", "exports", "knockout", "Configuration", "Managers/Experiment", "Models/Slide"], function (require, exports, knockout, Configuration, ExperimentManager, SlideModel) {
    var SlideShell = (function () {
        function SlideShell() {
            var _this = this;
            this.Title = knockout.observable();
            this.SlideName = knockout.observable();
            this.SlideData = knockout.observable();
            this.SlideIndex = knockout.observable(0);
            this.CanGoToNextSlide = knockout.observable(false);
            this.AreFooterControlsVisible = knockout.observable(true);
            this.SlideNumber = knockout.computed(function () { return _this.SlideIndex() + 1; });
            this.IsLoadingSlide = knockout.computed(function () { return _this.SlideData() == null; });
            this.NumberOfSlides = ExperimentManager.NumberOfSlides;
            this.Title(Configuration.ExperimentTitle);
            this.SlideName(Configuration.SlideName);
            this.HasTitle = knockout.computed(function () { return _this.Title() !== ""; });
            this._experimentMangerIsReadySubscription = ExperimentManager.IsReady.subscribe(function (r) {
                if (!r)
                    return;
                _this.CleanExperimentLoaded();
                _this.LoadSlide(0);
            });
            if (ExperimentManager.IsReady())
                this.LoadSlide(0);
        }
        SlideShell.prototype.GoToNextSlide = function () {
            this.CanGoToNextSlide(false);
            var slideIndex = this.SlideIndex();
            this.LoadSlide(slideIndex + 1);
            if (Configuration.CloseSlides)
                ExperimentManager.CloseSlide(slideIndex);
        };
        SlideShell.prototype.LoadSlide = function (index) {
            var _this = this;
            this.SlideIndex(index);
            if (this.SlideData() != null) {
                var oldSlide = this.SlideData();
                this.SlideData().Complete(function () {
                    if (Configuration.CloseSlides && oldSlide.Index != null)
                        setTimeout(function () { return ExperimentManager.CloseSlide(oldSlide.Index); }, 500);
                });
            }
            this.SlideData(null);
            if (index < this.NumberOfSlides() || index === 0)
                ExperimentManager.LoadSlide(this.SlideIndex(), function (questions) { return _this.SlideData(new SlideModel("Slides/Default", index, _this.CanGoToNextSlide, questions)); });
            else {
                this.AreFooterControlsVisible(false);
                this.SlideData(new SlideModel("Slides/Completed"));
            }
        };
        SlideShell.prototype.CleanExperimentLoaded = function () {
            this._experimentMangerIsReadySubscription.dispose();
            this._experimentMangerIsReadySubscription = null;
        };
        SlideShell.prototype.dispose = function () {
            if (this._experimentMangerIsReadySubscription)
                this.CleanExperimentLoaded();
        };
        return SlideShell;
    })();
    return SlideShell;
});
