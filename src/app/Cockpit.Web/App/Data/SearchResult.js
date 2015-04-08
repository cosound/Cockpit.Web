define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var SearchResult = (function () {
        function SearchResult(data, canSelectSearchHits) {
            this.IsSelected = knockout.observable(false);
            this.Id = data.Id;
            this.Title = data.Title;
            this.CanSelectSearchHits = canSelectSearchHits;
        }
        return SearchResult;
    })();
    return SearchResult;
});
