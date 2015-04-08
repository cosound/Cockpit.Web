define(["require", "exports", "knockout", "routie"], function (require, exports, knockout, Routie) {
    exports.CurrentPage = knockout.observable();
    function Initialize() {
        exports.CurrentPage.extend({ rateLimit: 0 });
        Routie({
            "": function () {
                Navigate("Search");
            },
            "Search": function () {
                LoadPage("Search");
            },
            "Selections": function () {
                LoadPage("Selections");
            }
        });
    }
    exports.Initialize = Initialize;
    function Navigate(path) {
        Routie(path);
    }
    exports.Navigate = Navigate;
    function LoadPage(name, data) {
        exports.CurrentPage({ Name: name, Data: data });
    }
});
