define(["require", "exports", "knockout", "Managers/Experiment", "Models/Slide"], function (require, exports, knockout, ExperimentManager, SlideModel) {
    var SlideShell = (function () {
        function SlideShell() {
            var _this = this;
            this.SlideData = knockout.observable();
            this.AreAllQuestionsAnswered = knockout.observable(false);
            this.IsHighlighted = knockout.observable(false);
            this.IsLoadingSlide = knockout.computed(function () { return _this.SlideData() == null; });
            this.SlideIndex = ExperimentManager.CurrentSlideIndex;
            this.SlideNumber = knockout.computed(function () { return _this.SlideIndex() + 1; });
            this.NumberOfSlides = ExperimentManager.NumberOfSlides;
            this.IsPreviousSlideVisible = knockout.computed(function () { return ExperimentManager.GoToPreviousSlideEnabled() && !ExperimentManager.CloseSlidesEnabled(); });
            this.IsPreviousSlideEnabled = knockout.computed(function () { return _this.IsPreviousSlideVisible() && !_this.IsLoadingSlide() && _this.SlideIndex() !== 0; });
            this.IsNextSlideVisible = knockout.computed(function () { return true; });
            this.IsNextSlideEnabled = knockout.computed(function () { return _this.IsNextSlideVisible() && !_this.IsLoadingSlide() && _this.SlideNumber() !== _this.NumberOfSlides(); });
            this.IsCloseExperimentVisible = knockout.computed(function () { return ExperimentManager.IsExperimentCompleted() && ExperimentManager.CloseExperimentEnabled(); });
            this.Title = ExperimentManager.Title;
            this.SlideName = ExperimentManager.SlideName;
            this.HasTitle = knockout.computed(function () { return _this.Title() !== ""; });
            this._experimentMangerIsReadySubscription = ExperimentManager.IsReady.subscribe(function (r) {
                if (!r)
                    return;
                _this.LoadNextSlide();
            });
            if (ExperimentManager.IsReady())
                this.LoadNextSlide();
        }
        SlideShell.prototype.GoToNextSlide = function () {
            var _this = this;
            if (this.AreAllQuestionsAnswered()) {
                this.LoadNextSlide();
            }
            else {
                this.IsHighlighted(false);
                setTimeout(function () { return _this.IsHighlighted(true); }, 50);
            }
        };
        SlideShell.prototype.LoadNextSlide = function () {
            var _this = this;
            this.UnloadSlide();
            ExperimentManager.LoadNextSlide(function (index, questions) { return _this.SlideData(new SlideModel("Slides/Default", index, _this.AreAllQuestionsAnswered, questions)); });
        };
        SlideShell.prototype.GoToPreviousSlide = function () {
            var _this = this;
            this.UnloadSlide();
            ExperimentManager.LoadPreviousSlide(function (index, questions) { return _this.SlideData(new SlideModel("Slides/Default", index, _this.AreAllQuestionsAnswered, questions)); });
        };
        SlideShell.prototype.UnloadSlide = function () {
            this.IsHighlighted(false);
            if (this.SlideData() != null) {
                var oldSlide = this.SlideData();
                this.SlideData().Complete(function () { return ExperimentManager.CloseSlide(oldSlide.Index); });
            }
            this.SlideData(null);
        };
        SlideShell.prototype.Close = function () {
            ExperimentManager.Close();
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
