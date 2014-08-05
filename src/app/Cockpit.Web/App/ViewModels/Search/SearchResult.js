define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var SearchResult = (function () {
        function SearchResult(title) {
            this.Title = knockout.observable("");
            this.Selected = knockout.observable(false);
            this.Title(title);
        }
        return SearchResult;
    })();

    
    return SearchResult;
});
