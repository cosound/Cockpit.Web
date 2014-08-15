define(["require", "exports", "knockout", "ExperimentManager", "ViewModels/NavigationPage"], function(require, exports, knockout, ExperimentManager, NavigationPage) {
    var SlideShell = (function () {
        function SlideShell(slideId) {
            var _this = this;
            this.Slide = knockout.observable();
            if (ExperimentManager.ExperimentLoaded())
                this.LoadSlide(parseInt(slideId));
            else
                ExperimentManager.ExperimentLoaded.subscribe(function (l) {
                    return _this.LoadSlide(parseInt(slideId));
                });
        }
        SlideShell.prototype.LoadSlide = function (id) {
            var slide = ExperimentManager.Experiment().Slides[id];

            this.Slide(new NavigationPage("Slides/" + slide.Type, id.toString()));
        };
        return SlideShell;
    })();

    
    return SlideShell;
});
//# sourceMappingURL=SlideShell.js.map
