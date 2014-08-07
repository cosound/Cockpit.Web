define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var SearchResult = (function () {
        function SearchResult(title, date) {
            this.Title = knockout.observable("");
            this.Date = knockout.observable();
            this.Selected = knockout.observable(false);
            this.Title(title);
            this.Date(date.getDate() + " / " + (date.getMonth() + 1) + " - " + date.getFullYear());
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
