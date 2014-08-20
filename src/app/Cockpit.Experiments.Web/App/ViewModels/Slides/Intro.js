define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var Intro = (function () {
        function Intro(data) {
            this.Text = knockout.observable();
            var slide = data.Slide;

            this.Text(slide.Text);

            data.CanGoToNextSlide(true);
        }
        return Intro;
    })();

    
    return Intro;
});
//# sourceMappingURL=Intro.js.map
