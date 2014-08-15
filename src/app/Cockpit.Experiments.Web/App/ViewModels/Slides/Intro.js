define(["require", "exports", "knockout", "ExperimentManager", "Navigation"], function(require, exports, knockout, ExperimentManager, Navigation) {
    var Intro = (function () {
        function Intro(id) {
            this.Text = knockout.observable();
            this._id = parseInt(id);

            var slide = ExperimentManager.Experiment().Slides[this._id];
            this.Text(slide.Text);
        }
        Intro.prototype.NextSlide = function () {
            Navigation.Navigate("Experiment/7/" + (this._id + 1));
        };
        return Intro;
    })();

    
    return Intro;
});
//# sourceMappingURL=Intro.js.map
