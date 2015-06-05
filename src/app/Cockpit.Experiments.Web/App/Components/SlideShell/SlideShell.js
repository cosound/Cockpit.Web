define(["require", "exports", "knockout", "Managers/Experiment", "Models/Slide"], function (require, exports, knockout, ExperimentManager, SlideModel) {
    var SlideShell = (function () {
        function SlideShell() {
            var _this = this;
            this.SlideData = knockout.observable();
            this.CanGoToNextSlide = knockout.observable(false);
            this.AreFooterControlsVisible = knockout.observable(true);
            this.SlideIndex = ExperimentManager.CurrentSlideIndex;
            this.SlideNumber = knockout.computed(function () { return _this.SlideIndex() + 1; });
            this.IsLoadingSlide = knockout.computed(function () { return _this.SlideData() == null; });
            this.NumberOfSlides = ExperimentManager.NumberOfSlides;
            this.Title = ExperimentManager.Title;
            this.SlideName = ExperimentManager.SlideName;
            this.HasTitle = knockout.computed(function () { return _this.Title() !== ""; });
            this._experimentMangerIsReadySubscription = ExperimentManager.IsReady.subscribe(function (r) {
                if (!r)
                    return;
                _this.CleanExperimentLoaded();
                _this.GoToNextSlide();
            });
            if (ExperimentManager.IsReady())
                this.GoToNextSlide();
        }
        SlideShell.prototype.GoToNextSlide = function () {
            var _this = this;
            this.CanGoToNextSlide(false);
            var slideIndex = this.SlideIndex();
            if (this.SlideData() != null) {
                var oldSlide = this.SlideData();
                this.SlideData().Complete(function () { return ExperimentManager.CloseSlide(oldSlide.Index); });
            }
            this.SlideData(null);
            if (slideIndex + 1 < this.NumberOfSlides() || this.NumberOfSlides() === 0)
                ExperimentManager.LoadNextSlide(function (index, questions) { return _this.SlideData(new SlideModel("Slides/Default", index, _this.CanGoToNextSlide, questions)); });
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
