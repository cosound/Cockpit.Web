define(["require", "exports", "ViewModels/Slides/Input"], function(require, exports, Input) {
    var Intro = (function () {
        function Intro(data) {
            this.Inputs = [];
            var slide = data.Slide;

            this.CanGoToNextSlide = data.CanGoToNextSlide;

            this.AddInputs(slide.Inputs);
        }
        Intro.prototype.AddInputs = function (inputs) {
            var _this = this;
            inputs.forEach(function (v) {
                var input = new Input(v);
                _this.Inputs.push(input);

                input.Value.subscribe(function (t) {
                    var noValue = false;
                    _this.Inputs.forEach(function (i) {
                        return noValue = noValue || i.Value() == null;
                    });

                    _this.CanGoToNextSlide(!noValue);
                });
            });
        };
        return Intro;
    })();

    
    return Intro;
});
//# sourceMappingURL=Form.js.map
