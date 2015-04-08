define(["require", "exports", "knockout", "Managers/Notification", "Managers/Portal", "Managers/Title", "Managers/Selections"], function (require, exports, knockout, Notification, Portal, Title, Selections) {
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
            var _this = this;
            this.SearchResults.removeAll();
            Portal.Search.Simple(this.Query(), 0, 10).WithCallback(function (response) {
                _this.SearchResults.removeAll();
                if (response.Error != null) {
                    Notification.NotifyError("Failed to get search: " + response.Error.Message);
                    return;
                }
                if (response.Body.Results.length > 0)
                    _this.SearchResults.push.apply(_this.SearchResults, response.Body.Results.map(function (r) { return _this.CreateSearchResult(r); }));
                _this.Query("");
            });
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
