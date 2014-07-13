define(["require", "exports", "knockout", "ViewModels/Page"], function(require, exports, knockout, Page) {
    exports.CurrentPage = knockout.observable();

    function Initialize() {
        exports.CurrentPage(new Page("Login"));
    }
    exports.Initialize = Initialize;

    function Navigate(path) {
        exports.CurrentPage(new Page(path));
    }
    exports.Navigate = Navigate;
});
