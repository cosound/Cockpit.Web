define(["require", "exports", "knockout", "Managers/Experiment", "Models/Slide"], function (require, exports, knockout, ExperimentManager, SlideModel) {
    var SlideShell = (function () {
        function SlideShell() {
            var _this = this;
            this.Name = knockout.observable();
            this.SlideData = knockout.observable();
            this.SlideIndex = knockout.observable(0);
            this.CanGoToNextSlide = knockout.observable(false);
            this.AreFooterControlsVisible = knockout.observable(true);
            this.SlideNumber = knockout.computed(function () { return _this.SlideIndex() + 1; });
            this.IsLoadingSlide = knockout.computed(function () { return _this.SlideData() == null; });
            this.NumberOfSlides = ExperimentManager.NumberOfSlides;
            this.Name("My Experiment");
            if (ExperimentManager.IsReady())
                this.LoadSlide(0);
            else {
                this._experimentMangerIsReadySubscription = ExperimentManager.IsReady.subscribe(function (l) {
                    _this.CleanExperimentLoaded();
                    _this.LoadSlide(0);
                });
            }
        }
        SlideShell.prototype.GoToNextSlide = function () {
            this.CanGoToNextSlide(false);
            this.LoadSlide(this.SlideIndex() + 1);
        };
        SlideShell.prototype.LoadSlide = function (index) {
            var _this = this;
            this.SlideIndex(index);
            if (this.SlideData() != null)
                this.SlideData().Complete();
            this.SlideData(null);
            if (index < this.NumberOfSlides() || index == 0)
                ExperimentManager.LoadSlide(this.SlideIndex(), function (questions) { return _this.SlideData(new SlideModel("Slides/Default", _this.CanGoToNextSlide, questions)); });
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
//# sourceMappingURL=SlideShell.js.map