define(["require", "exports", "knockout", "ExperimentManager"], function(require, exports, knockout, ExperimentManager) {
    var Intro = (function () {
        function Intro(id) {
            this.Text = knockout.observable();
            var slide = ExperimentManager.Experiment().Slides[parseInt(id)];
            this.Text(slide.Text);
        }
        return Intro;
    })();

    
    return Intro;
});
//# sourceMappingURL=Intro.js.map
