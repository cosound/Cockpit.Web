define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var Slide = (function () {
        function Slide(name, index, canGoToNextSlide, questions) {
            var _this = this;
            if (index === void 0) { index = null; }
            if (canGoToNextSlide === void 0) { canGoToNextSlide = null; }
            if (questions === void 0) { questions = null; }
            this._isWorking = knockout.observable(null);
            this.Index = index;
            this.Name = name;
            this.CanGoToNextSlide = canGoToNextSlide;
            this.Questions = questions;
            this.IsWorking = knockout.computed(function () { return _this._isWorking() != null ? _this._isWorking()() : false; });
        }
        Slide.prototype.Complete = function (callback) {
            if (this.SlideCompleted != null)
                this.SlideCompleted(callback);
        };
        Slide.prototype.ScrollToFirstInvalidAnswer = function () {
            if (this.ScrollToFirstInvalidAnswerCallback != null)
                this.ScrollToFirstInvalidAnswerCallback();
        };
        Slide.prototype.SetIsWorking = function (observeable) {
            this._isWorking(observeable);
        };
        return Slide;
    })();
    return Slide;
});
