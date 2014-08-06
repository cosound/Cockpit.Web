define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var Selection = (function () {
        function Selection(name, searchResults) {
            this.Name = knockout.observable("");
            this.SearchResults = knockout.observableArray();
            if (name)
                this.Name(name);
            if (searchResults)
                this.SearchResults.push.apply(this.SearchResults, searchResults);
        }
        return Selection;
    })();

    
    return Selection;
});
