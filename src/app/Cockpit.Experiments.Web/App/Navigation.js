define(["require", "exports", "knockout", "routie", "ViewModels/NavigationPage", "ExperimentManager"], function(require, exports, knockout, Routie, NavigationPage, ExperimentManager) {
    exports.CurrentPage = knockout.observable();

    function Initialize() {
        Routie({
            "": function () {
                exports.Navigate("Experiment/7");
            },
            "Experiment/:id": function (id) {
                LoadSlide(id, 0);
            },
            "Experiment/:id/:slideId": function (id, slideId) {
                LoadSlide(id, parseInt(slideId));
            },
            "*": function () {
                LoadPage("NotFound");
            }
        });
    }
    exports.Initialize = Initialize;

    function Navigate(path) {
        Routie(path);
    }
    exports.Navigate = Navigate;

    function LoadPage(name, data) {
        exports.CurrentPage(new NavigationPage(name, data));
    }

    function LoadSlide(id, slideId) {
        if (!ExperimentManager.ExperimentLoaded() && !ExperimentManager.ExperimentIsLoading())
            ExperimentManager.LoadExperiment(id);

        if (exports.CurrentPage() == null || exports.CurrentPage().Name() != "SlideShell")
            exports.CurrentPage(new NavigationPage("SlideShell", { SlideId: knockout.observable(slideId) }));
        else
            exports.CurrentPage().Data().SlideId(slideId);
    }
});
//# sourceMappingURL=Navigation.js.map
