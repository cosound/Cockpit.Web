define(["require", "exports", "knockout", "routie", "Managers/NavigationPage", "Managers/Experiment", "CockpitPortal"], function (require, exports, knockout, Routie, NavigationPage, ExperimentManager, CockpitPortal) {
    var Navigation = (function () {
        function Navigation() {
            var _this = this;
            this.CurrentPage = knockout.observable();
            Routie({
                "": function () {
                    _this.LoadPage("Welcome");
                },
                "Experiment/:id": function (id) {
                    _this.LoadSlide(id);
                },
                "ExperimentList/:id": function (id) {
                    _this.LoadExperimentFromList(id);
                },
                "NoMoreExperiments": function () {
                    _this.LoadPage("NoMoreExperiments");
                },
                "SlideLocked": function () {
                    _this.LoadPage("SlideLocked");
                },
                "TextFormat": function () {
                    _this.LoadPage("TextFormat");
                },
                "ExperimentNotFound/:id": function (id) {
                    _this.LoadPage("ExperimentNotFound", id);
                },
                "*": function () {
                    _this.LoadPage("NotFound");
                }
            });
        }
        Navigation.prototype.Navigate = function (path) {
            Routie(path);
        };
        Navigation.prototype.LoadPage = function (name, data) {
            this.CurrentPage(new NavigationPage(name, data));
        };
        Navigation.prototype.LoadSlide = function (id) {
            ExperimentManager.Load(id);
            if (this.CurrentPage() == null || this.CurrentPage().Name() !== "SlideShell")
                this.CurrentPage(new NavigationPage("SlideShell"));
        };
        Navigation.prototype.LoadExperimentFromList = function (id) {
            var _this = this;
            CockpitPortal.Experiment.Next(id).WithCallback(function (response) {
                if (response.Error != null) {
                    _this.Navigate("NoMoreExperiments");
                    return;
                }
                if (response.Body.Results.length === 0)
                    _this.Navigate("NoMoreExperiments");
                else
                    _this.Navigate("Experiment/" + response.Body.Results[0].Id);
            });
        };
        return Navigation;
    })();
    var instance = new Navigation();
    return instance;
});
