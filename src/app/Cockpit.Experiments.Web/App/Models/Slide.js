define(["require", "exports"], function (require, exports) {
    var Slide = (function () {
        function Slide(name, canGoToNextSlide, questions) {
            if (canGoToNextSlide === void 0) { canGoToNextSlide = null; }
            if (questions === void 0) { questions = null; }
            this.Name = name;
            this.CanGoToNextSlide = canGoToNextSlide;
            this.Questions = questions;
        }
        return Slide;
    })();
    return Slide;
});
//# sourceMappingURL=Slide.js.map