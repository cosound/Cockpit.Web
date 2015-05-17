define(["require", "exports"], function (require, exports) {
    var Slide = (function () {
        function Slide(name, index, canGoToNextSlide, questions) {
            if (index === void 0) { index = null; }
            if (canGoToNextSlide === void 0) { canGoToNextSlide = null; }
            if (questions === void 0) { questions = null; }
            this.Index = index;
            this.Name = name;
            this.CanGoToNextSlide = canGoToNextSlide;
            this.Questions = questions;
        }
        Slide.prototype.Complete = function (callback) {
            if (this.SlideCompleted != null)
                this.SlideCompleted(callback);
        };
        return Slide;
    })();
    return Slide;
});
