define(["require", "exports"], function(require, exports) {
    var Intro = (function () {
        function Intro(data) {
            var slide = data.Slide;

            this.Inputs = slide.Inputs;
        }
        Intro.prototype.NextSlide = function () {
        };
        return Intro;
    })();

    
    return Intro;
});
//# sourceMappingURL=Form.js.map
