define(["require", "exports", "knockout", "routie", "Managers/NavigationPage", "Managers/Title"], function (require, exports, knockout, Routie, NavigationPage, Title) {
    var Navigation = (function () {
        function Navigation() {
            var _this = this;
            this.CurrentPage = knockout.observable();
            this.ExperimentId = knockout.observable(null);
            this.ExperimentListId = knockout.observable(null);
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
            Title.ToDefault();
            this.CurrentPage(new NavigationPage(name, data));
        };
        Navigation.prototype.LoadSlide = function (id) {
            this.ExperimentId(id);
            if (this.CurrentPage() == null || this.CurrentPage().Name() !== "SlideShell")
                this.LoadPage("SlideShell");
        };
        Navigation.prototype.LoadExperimentFromList = function (id) {
            this.ExperimentId(null);
            this.ExperimentListId(id);
        };
        return Navigation;
    })();
    var instance = new Navigation();
    return instance;
});
