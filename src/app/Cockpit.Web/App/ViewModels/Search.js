define(["require", "exports", "knockout", "ViewModels/SearchResult"], function(require, exports, knockout, SearchResult) {
    var Search = (function () {
        function Search() {
            this.Query = knockout.observable("");
            this.Results = knockout.observableArray();
        }
        Search.prototype.Search = function () {
            this.Results.removeAll();

            for (var i = 0; i < 20; i++)
                this.Results.push(new SearchResult(this.Query() + " Result " + i));
        };
        return Search;
    })();

    
    return Search;
});
