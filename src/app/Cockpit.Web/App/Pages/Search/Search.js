define(["require", "exports", "knockout", "Managers/Title", "Managers/Selections"], function (require, exports, knockout, Title, Selections) {
    var Search = (function () {
        function Search(selectionId) {
            this.Query = knockout.observable("");
            this.SearchResults = knockout.observableArray();
            Title.ToDefault("Search");
            this.Selections = Selections.Selections;
            console.log(selectionId);
        }
        Search.prototype.Search = function () {
            for (var i = 0; i < 20; i++) {
                this.SearchResults.push({ Id: i.toString(), Title: this.Query() + "_" + i });
            }
            this.Query("");
        };
        return Search;
    })();
    return Search;
});
