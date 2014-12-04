define(["require", "exports", "ViewModels/Slides/Input"], function(require, exports, Input) {
    var Intro = (function () {
        function Intro(data) {
            this.Inputs = [];
            var slide = data.Slide;

            this.CanGoToNextSlide = data.CanGoToNextSlide;

            this.AddInputs(slide.Inputs);
            this._UserInput = data.UserInput;
        }
        Intro.prototype.AddInputs = function (inputs) {
            var _this = this;
            inputs.forEach(function (v) {
                var input = new Input(v);
                _this.Inputs.push(input);

                input.Value.subscribe(function (t) {
                    var noValue = false;
                    var totalValue = new Array();

                    _this.Inputs.forEach(function (i) {
                        noValue = noValue || i.Value() == null;
                        totalValue.push(i.Configuration.Type + "=" + i.Value());
                    });

                    _this._UserInput(totalValue.join(", "));

                    _this.CanGoToNextSlide(!noValue);
                });
            });
        };
        return Intro;
    })();

    
    return Intro;
});
//# sourceMappingURL=Form.js.map
