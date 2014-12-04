define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var ThankYou = (function () {
        function ThankYou(data) {
            this.Text = knockout.observable();
            var slide = data.Slide;

            this.Text(slide.Text);
        }
        return ThankYou;
    })();

    
    return ThankYou;
});
//# sourceMappingURL=ThankYou.js.map
