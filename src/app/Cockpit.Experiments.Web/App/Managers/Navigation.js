define(["require", "exports", "knockout", "routie", "Managers/NavigationPage", "Managers/Experiment"], function (require, exports, knockout, Routie, NavigationPage, ExperimentManager) {
    exports.CurrentPage = knockout.observable();
    function Initialize() {
        Routie({
            "": function () {
                Navigate("Experiment/ea3976c7-2d4a-4ef0-84a1-1d9e66f4a0e7");
            },
            "Experiment/:id": function (id) {
                LoadSlide(id);
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
    function LoadSlide(id) {
        if (!ExperimentManager.IsReady())
            ExperimentManager.SetId(id);
        if (exports.CurrentPage() == null || exports.CurrentPage().Name() != "SlideShell")
            exports.CurrentPage(new NavigationPage("SlideShell"));
    }
});
//# sourceMappingURL=Navigation.js.map