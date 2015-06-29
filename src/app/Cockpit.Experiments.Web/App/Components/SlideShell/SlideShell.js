define(["require", "exports", "knockout", "Managers/Experiment", "Models/Slide"], function (require, exports, knockout, ExperimentManager, SlideModel) {
    var SlideShell = (function () {
        function SlideShell() {
            var _this = this;
            this.SlideData = knockout.observable();
            this.AreAllQuestionsAnswered = knockout.observable(false);
            this.IsHighlighted = knockout.observable(false);
            this.IsWaitingForNext = knockout.observable(false);
            this._subscriptions = [];
            this.IsLoadingSlide = knockout.computed(function () { return _this.SlideData() == null; });
            this.SlideIndex = ExperimentManager.CurrentSlideIndex;
            this.SlideNumber = knockout.computed(function () { return _this.SlideIndex() + 1; });
            this.NumberOfSlides = ExperimentManager.NumberOfSlides;
            this.IsWaiting = knockout.computed(function () { return _this.IsWaitingForNext(); });
            this.IsPreviousSlideVisible = knockout.computed(function () { return ExperimentManager.GoToPreviousSlideEnabled() && !ExperimentManager.CloseSlidesEnabled(); });
            this.IsPreviousSlideEnabled = knockout.computed(function () { return _this.IsPreviousSlideVisible() && !_this.IsLoadingSlide() && _this.SlideIndex() !== 0 && !_this.IsWaiting(); });
            this.IsNextSlideVisible = knockout.computed(function () { return _this.SlideNumber() !== _this.NumberOfSlides(); });
            this.IsNextSlideEnabled = knockout.computed(function () { return _this.IsNextSlideVisible() && !_this.IsLoadingSlide() && !_this.IsWaiting(); });
            this.IsCloseExperimentVisible = knockout.computed(function () { return ExperimentManager.IsExperimentCompleted() && ExperimentManager.CloseExperimentEnabled(); });
            this.IsCloseExperimentEnabled = knockout.computed(function () { return _this.IsCloseExperimentVisible() && !_this.IsWaiting(); });
            this.Title = ExperimentManager.SlideTitle;
            this.HasTitle = knockout.computed(function () { return _this.Title() !== ""; });
            this._subscriptions.push(ExperimentManager.IsReady.subscribe(function (r) {
                if (!r)
                    return;
                _this.LoadNextSlide();
            }));
            this.IsHighlighted.subscribe(function (value) {
                if (value)
                    setTimeout(function () { return _this.IsHighlighted(false); }, 3000);
            });
            if (ExperimentManager.IsReady())
                this.LoadNextSlide();
        }
        SlideShell.prototype.GoToNextSlide = function () {
            var _this = this;
            this.IsWaitingForNext(true);
            this.DoWhenDone(function () { return !_this.IsLoadingSlide() && !_this.SlideData().IsWorking(); }, function () {
                _this.IsWaitingForNext(false);
                if (_this.AreAllQuestionsAnswered()) {
                    _this.LoadNextSlide();
                }
                else {
                    _this.SlideData().ScrollToFirstInvalidAnswer();
                    if (_this.IsHighlighted()) {
                        _this.IsHighlighted(false);
                        setTimeout(function () { return _this.IsHighlighted(true); }, 50);
                    }
                    else
                        _this.IsHighlighted(true);
                }
            });
        };
        SlideShell.prototype.LoadNextSlide = function () {
            var _this = this;
            this.UnloadSlide(true);
            ExperimentManager.LoadNextSlide(function (index, questions) { return _this.SlideData(new SlideModel("Slides/Default", index, _this.AreAllQuestionsAnswered, questions)); });
        };
        SlideShell.prototype.GoToPreviousSlide = function () {
            var _this = this;
            this.UnloadSlide(false);
            ExperimentManager.LoadPreviousSlide(function (index, questions) { return _this.SlideData(new SlideModel("Slides/Default", index, _this.AreAllQuestionsAnswered, questions)); });
        };
        SlideShell.prototype.DoWhenDone = function (check, action) {
            if (check()) {
                action();
                return;
            }
            var sub = knockout.computed(check).subscribe(function (v) {
                sub.dispose();
                action();
            });
            this._subscriptions.push(sub);
        };
        SlideShell.prototype.UnloadSlide = function (complete) {
            this.IsHighlighted(false);
            if (complete && this.SlideData() != null) {
                var oldSlide = this.SlideData();
                this.SlideData().Complete(function () { return ExperimentManager.CloseSlide(oldSlide.Index); });
            }
            this.SlideData(null);
        };
        SlideShell.prototype.Close = function () {
            ExperimentManager.Close();
        };
        SlideShell.prototype.dispose = function () {
            this._subscriptions.forEach(function (s) { return s.dispose(); });
        };
        return SlideShell;
    })();
    return SlideShell;
});
