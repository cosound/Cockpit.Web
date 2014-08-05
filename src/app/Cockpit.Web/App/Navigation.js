define(["require", "exports", "knockout", "routie", "AuthorizationManager", "ViewModels/Page"], function(require, exports, knockout, Routie, AuthorizationManager, Page) {
    exports.CurrentPage = knockout.observable();

    function Initialize() {
        Routie({
            "": function () {
                LoadPage("Login");
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

        AuthorizationManager.IsAuthenticated.subscribe(function (newValue) {
            return IsAuthenticatedChanged(newValue);
        });
    }
    exports.Initialize = Initialize;

    function Navigate(path) {
        Routie(path);
    }
    exports.Navigate = Navigate;

    function LoadPage(name) {
        exports.CurrentPage(new Page(name + "/" + name));
    }

    function IsAuthenticatedChanged(isAuthenticated) {
        exports.Navigate(isAuthenticated ? "Search" : "");
    }
});
