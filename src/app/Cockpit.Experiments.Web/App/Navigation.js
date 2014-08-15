define(["require", "exports", "knockout", "routie", "ViewModels/NavigationPage", "ExperimentManager"], function(require, exports, knockout, Routie, NavigationPage, ExperimentManager) {
    exports.CurrentPage = knockout.observable();

    function Initialize() {
        Routie({
            "": function () {
                exports.Navigate("Experiment/7");
            },
            "Experiment/:id": function (id) {
                LoadSlide(id, "0");
            },
            "Experiment/:id/:slideId": function (id, slideId) {
                LoadSlide(id, slideId);
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

    function LoadSlide(id, slidId) {
        ExperimentManager.LoadExperiment(id);

        if (exports.CurrentPage() == null || exports.CurrentPage().Name() != "SlideShell")
            exports.CurrentPage(new NavigationPage("SlideShell", slidId));
        else
            exports.CurrentPage().Data(slidId);
    }
});
//# sourceMappingURL=Navigation.js.map
