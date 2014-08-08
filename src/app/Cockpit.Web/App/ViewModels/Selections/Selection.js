define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var Selection = (function () {
        function Selection(name, searchResults) {
            this.Name = knockout.observable("");
            this.SearchResults = knockout.observableArray();
            this.CreatedDate = knockout.observable("");
            if (name)
                this.Name(name);
            if (searchResults)
                this.SearchResults.push.apply(this.SearchResults, searchResults);

            var date = new Date();
            this.CreatedDate(date.getDate() + " / " + (date.getMonth() + 1) + " - " + date.getFullYear());
        }
        Selection.prototype.SetSelector = function (selector) {
            this._selector = selector;
            return this;
        };

        Selection.prototype.Select = function () {
            if (this._selector)
                this._selector(this);

            return true;
        };
        return Selection;
    })();

    
    return Selection;
});
