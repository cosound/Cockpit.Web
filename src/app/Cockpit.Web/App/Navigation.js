define(["require", "exports", "knockout", "routie", "AuthenticationManager", "ViewModels/Page"], function(require, exports, knockout, Routie, AuthenticationManager, Page) {
    var goToAfterAuthentication;

    exports.CurrentPage = knockout.observable();

    function Initialize() {
        Routie({
            "": function () {
                LoadPage("Login", false);
            },
            "Projects": function () {
                LoadPage("Projects");
            },
            "Search": function () {
                LoadPage("Search");
            },
            "Selections": function () {
                LoadPage("Selections");
            },
            "Experiments": function () {
                LoadPage("Experiments");
            },
            "CreateExperiment": function () {
                LoadPage("CreateExperiment");
            },
            "*": function () {
                LoadPage("NotFound");
            }
        });

        AuthenticationManager.IsAuthenticated.subscribe(function (newValue) {
            return IsAuthenticatedChanged(newValue);
        });
    }
    exports.Initialize = Initialize;

    function Navigate(path) {
        Routie(path);
    }
    exports.Navigate = Navigate;

    function LoadPage(name, requiresAuthentication) {
        if (typeof requiresAuthentication === "undefined") { requiresAuthentication = true; }
        var page = new Page(name + "/" + name);

        if (requiresAuthentication && !AuthenticationManager.IsAuthenticated()) {
            goToAfterAuthentication = page;
            page = new Page("Login/Login");
        } else
            goToAfterAuthentication = null;

        exports.CurrentPage(page);
    }

    function IsAuthenticatedChanged(isAuthenticated) {
        if (isAuthenticated) {
            if (goToAfterAuthentication) {
                exports.CurrentPage(goToAfterAuthentication);
                goToAfterAuthentication = null;
            } else
                exports.Navigate("Search");
        } else
            exports.Navigate("");
    }
});
