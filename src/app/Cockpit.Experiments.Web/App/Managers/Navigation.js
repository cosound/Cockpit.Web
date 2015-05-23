define(["require", "exports", "knockout", "routie", "Managers/NavigationPage", "Managers/Experiment", "CockpitPortal"], function (require, exports, knockout, Routie, NavigationPage, ExperimentManager, CockpitPortal) {
    exports.CurrentPage = knockout.observable();
    function Initialize() {
        Routie({
            "": function () {
                LoadPage("Welcome");
            },
            "Experiment/:id": function (id) {
                LoadSlide(id);
            },
            "ExperimentList/:id": function (id) {
                LoadExperimentFromList(id);
            },
            "NoMoreExperiments": function () {
                LoadPage("NoMoreExperiments");
            },
            "SlideLocked": function () {
                LoadPage("SlideLocked");
            },
            "ExperimentNotFound/:id": function (id) {
                LoadPage("ExperimentNotFound", id);
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
        ExperimentManager.SetId(id);
        if (exports.CurrentPage() == null || exports.CurrentPage().Name() !== "SlideShell")
            exports.CurrentPage(new NavigationPage("SlideShell"));
    }
    function LoadExperimentFromList(id) {
        CockpitPortal.Experiment.Next(id).WithCallback(function (response) {
            if (response.Error != null) {
                Navigate("NoMoreExperiments");
                return;
            }
            if (response.Body.Results.length === 0)
                Navigate("NoMoreExperiments");
            else
                Navigate("Experiment/" + response.Body.Results[0].Id);
        });
    }
});
