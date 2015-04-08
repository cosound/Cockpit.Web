define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var SearchResult = (function () {
        function SearchResult(data) {
            this.IsSelected = knockout.observable(false);
            this.Id = data.Id;
            this.Title = data.Title;
        }
        return SearchResult;
    })();
    return SearchResult;
});
