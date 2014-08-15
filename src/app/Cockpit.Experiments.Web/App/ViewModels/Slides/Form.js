define(["require", "exports", "ExperimentManager"], function(require, exports, ExperimentManager) {
    var Intro = (function () {
        function Intro(id) {
            this._id = parseInt(id);

            var slide = ExperimentManager.Experiment().Slides[this._id];
            this.Inputs = slide.Inputs;
        }
        Intro.prototype.NextSlide = function () {
        };
        return Intro;
    })();

    
    return Intro;
});
//# sourceMappingURL=Form.js.map
