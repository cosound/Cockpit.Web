define(["require", "exports", "knockout", "routie", "AuthenticationManager", "ViewModels/Page"], function(require, exports, knockout, Routie, AuthenticationManager, Page) {
    exports.CurrentPage = knockout.observable();

    function Initialize() {
        Routie({
            "": function () {
                LoadPage("Login", false);
            },
            "Search": function () {
                LoadPage("Search");
            },
            "Selections": function () {
                LoadPage("Selections");
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
        if (requiresAuthentication && AuthenticationManager.IsAuthenticated())
            exports.CurrentPage(new Page(name + "/" + name));
    }

    function IsAuthenticatedChanged(isAuthenticated) {
        exports.Navigate(isAuthenticated ? "Search" : "");
    }
});
