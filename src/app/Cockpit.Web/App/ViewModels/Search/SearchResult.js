define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var SearchResult = (function () {
        function SearchResult(title) {
            this.Title = knockout.observable("");
            this.Selected = knockout.observable(false);
            this.Title(title);
        }
        SearchResult.prototype.SetSelector = function (selector) {
            this._selector = selector;
            return this;
        };

        SearchResult.prototype.Select = function () {
            if (this._selector)
                this._selector(this);

            return true;
        };
        return SearchResult;
    })();

    
    return SearchResult;
});
