define(["require", "exports", "knockout", "Managers/Title", "Managers/Selections"], function (require, exports, knockout, Title, Selections) {
    var Search = (function () {
        function Search(selectionId) {
            var _this = this;
            this.Query = knockout.observable("");
            this.SearchResults = knockout.observableArray();
            this.SelectedSelection = knockout.observable(null);
            Title.ToDefault("Search");
            this.Selections = Selections.Selections;
            this.CanAddToSelection = knockout.computed(function () { return _this.SelectedSelection() != null; });
        }
        Search.prototype.Search = function () {
            this.SearchResults.removeAll();
            for (var i = 0; i < 20; i++) {
                this.SearchResults.push(this.CreateSearchResult({ Id: i.toString(), Title: this.Query() + " " + i }));
            }
            this.Query("");
        };
        Search.prototype.CreateSearchResult = function (data) {
            return {
                Id: data.Id,
                Title: data.Title,
                IsSelected: knockout.observable(false)
            };
        };
        Search.prototype.AddToSelection = function () {
            if (!this.CanAddToSelection())
                return;
            var results = this.SearchResults().filter(function (s) { return s.IsSelected(); });
            var items = results.map(function (s) { return ({ Id: s.Id, Title: s.Title }); });
            Selections.AddToSelection(this.SelectedSelection().Id, items, function (success) {
                if (success)
                    results.forEach(function (r) { return r.IsSelected(false); });
            });
        };
        return Search;
    })();
    return Search;
});
