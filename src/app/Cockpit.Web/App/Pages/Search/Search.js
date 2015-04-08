define(["require", "exports", "knockout", "Managers/Notification", "Managers/Portal", "Managers/Title", "Managers/Selections", "Data/SearchResult"], function (require, exports, knockout, Notification, Portal, Title, Selections, SearchResult) {
    var Search = (function () {
        function Search(selectionId) {
            var _this = this;
            this.Query = knockout.observable("");
            this.SearchResults = knockout.observableArray();
            this.SelectedSelection = knockout.observable(null);
            this.TotalNumberOfResults = knockout.observable(0);
            this._pageIndex = knockout.observable(0);
            this._pageSize = 10;
            Title.ToDefault("Search");
            this.Selections = Selections.Selections;
            this.CanUpdateSelection = knockout.computed(function () { return _this.SelectedSelection() != null; });
            this.CanSelectSearchHits = this.CanUpdateSelection;
            this.CanLoadMore = knockout.computed(function () { return _this.TotalNumberOfResults() > (_this._pageIndex() + 1) * _this._pageSize; });
            this.SelectedSelection.subscribe(function (s) { return _this.UpdateSelections(s); });
        }
        Search.prototype.UpdateSelections = function (selection, searchResults) {
            if (selection === void 0) { selection = null; }
            if (searchResults === void 0) { searchResults = null; }
            selection = selection || this.SelectedSelection();
            searchResults = searchResults || this.SearchResults();
            searchResults.forEach(function (s) { return s.SetSavedState(selection != null && selection.Items[s.Id]); });
        };
        Search.prototype.Search = function () {
            var _this = this;
            this.SearchResults.removeAll();
            this._lastQuery = this.Query();
            this.TotalNumberOfResults(0);
            this._pageIndex(0);
            this.InnerSearch(this._lastQuery, this._pageIndex(), this._pageSize, function (r, t) {
                _this.SearchResults.removeAll();
                _this.SearchResults.push.apply(_this.SearchResults, r);
                _this.TotalNumberOfResults(t);
            });
        };
        Search.prototype.LoadMore = function () {
            var _this = this;
            this._pageIndex(this._pageIndex() + 1);
            this.InnerSearch(this._lastQuery, this._pageIndex(), this._pageSize, function (r) { return _this.SearchResults.push.apply(_this.SearchResults, r); });
        };
        Search.prototype.InnerSearch = function (query, index, size, callback) {
            var _this = this;
            Portal.Search.Simple(query, index, size).WithCallback(function (response) {
                if (response.Error != null) {
                    Notification.NotifyError("Failed to get search: " + response.Error.Message);
                    return;
                }
                var results = response.Body.Results.map(function (r) { return new SearchResult(r, _this.CanSelectSearchHits); });
                _this.UpdateSelections(null, results);
                callback(results, response.Body.TotalCount);
            });
        };
        Search.prototype.UpdateSelection = function () {
            var _this = this;
            if (!this.CanUpdateSelection())
                return;
            var changedResults = this.SearchResults().filter(function (s) { return s.HasChanges(); });
            var addResults = changedResults.filter(function (s) { return s.IsSelected(); });
            var removeResults = changedResults.filter(function (s) { return !s.IsSelected(); });
            if (addResults.length !== 0)
                Selections.AddToSelection(this.SelectedSelection().Id, addResults.map(function (s) { return s.Id; }), function (success) {
                    if (success)
                        _this.UpdateSelections(null, addResults);
                });
            if (removeResults.length !== 0)
                Selections.RemoveFromSelection(this.SelectedSelection().Id, removeResults.map(function (s) { return s.Id; }), function (success) {
                    if (success)
                        _this.UpdateSelections(null, removeResults);
                });
        };
        return Search;
    })();
    return Search;
});
