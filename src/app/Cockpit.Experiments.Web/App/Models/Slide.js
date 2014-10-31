define(["require", "exports"], function(require, exports) {
    var Slide = (function () {
        function Slide(name, canGoToNextSlide, questions) {
            if (typeof canGoToNextSlide === "undefined") { canGoToNextSlide = null; }
            if (typeof questions === "undefined") { questions = null; }
            this.Name = name;
            this.CanGoToNextSlide = canGoToNextSlide;
            this.Questions = questions;
        }
        return Slide;
    })();

    
    return Slide;
});
//# sourceMappingURL=Slide.js.map
