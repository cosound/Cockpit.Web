define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var SearchResult = (function () {
        function SearchResult(data, canToggleSelect) {
            var _this = this;
            this.IsSelected = knockout.observable(false);
            this.SavedIsSelected = knockout.observable(false);
            this.Id = data.Id;
            this.Title = data.Title;
            this.CanToggleSelect = canToggleSelect;
            this.HasChanges = knockout.computed(function () { return _this.IsSelected() !== _this.SavedIsSelected(); });
        }
        SearchResult.prototype.SetSavedState = function (isSelected) {
            this.IsSelected(isSelected);
            this.SavedIsSelected(isSelected);
        };
        return SearchResult;
    })();
    return SearchResult;
});
