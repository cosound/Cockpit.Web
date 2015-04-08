define(["require", "exports", "knockout", "Managers/Notification", "Managers/Portal", "Managers/Title", "Managers/Selections", "Data/SearchResult"], function (require, exports, knockout, Notification, Portal, Title, Selections, SearchResult) {
    var Search = (function () {
        function Search(selectionId) {
            var _this = this;
            this.Query = knockout.observable("");
            this.SearchResults = knockout.observableArray();
            this.SelectedSelection = knockout.observable(null);
            Title.ToDefault("Search");
            this.Selections = Selections.Selections;
            this.CanAddToSelection = knockout.computed(function () { return _this.SelectedSelection() != null; });
            this.CanSelectSearchHits = this.CanAddToSelection;
            this.SelectedSelection.subscribe(function (s) { return _this.UpdateSelections(s); });
        }
        Search.prototype.UpdateSelections = function (selection) {
            if (selection === void 0) { selection = null; }
            selection = selection || this.SelectedSelection();
            this.SearchResults().forEach(function (s) { return s.IsSelected(selection != null && selection.Items[s.Id] == true); });
        };
        Search.prototype.Search = function () {
            var _this = this;
            this.SearchResults.removeAll();
            Portal.Search.Simple(this.Query(), 0, 10).WithCallback(function (response) {
                _this.SearchResults.removeAll();
                if (response.Error != null) {
                    Notification.NotifyError("Failed to get search: " + response.Error.Message);
                    return;
                }
                if (response.Body.Results.length > 0)
                    _this.SearchResults.push.apply(_this.SearchResults, response.Body.Results.map(function (r) { return new SearchResult(r, _this.CanSelectSearchHits); }));
                _this.Query("");
                _this.UpdateSelections();
            });
        };
        Search.prototype.AddToSelection = function () {
            if (!this.CanAddToSelection())
                return;
            var results = this.SearchResults().filter(function (s) { return s.IsSelected(); });
            Selections.AddToSelection(this.SelectedSelection().Id, results.map(function (s) { return s.Id; }));
        };
        return Search;
    })();
    return Search;
});
