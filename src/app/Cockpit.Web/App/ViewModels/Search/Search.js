define(["require", "exports", "knockout", "Navigation", "SelectionManager", "ViewModels/Search/SearchResult", "less!Styles/Search"], function(require, exports, knockout, Navigation, SelectionManager, SearchResult) {
    var Search = (function () {
        function Search() {
            this.Query = knockout.observable("");
            this.Results = knockout.observableArray();
            this.SelectedSearchResulst = knockout.observableArray();
            this.HighlightedSearchResult = knockout.observable();
        }
        Search.prototype.Search = function () {
            var _this = this;
            this.Results.removeAll();

            for (var i = 0; i < 20; i++)
                this.Results.push(new SearchResult(this.Query() + " Result " + i).SetSelector(function (s) {
                    return _this.SearchResultSelected(s);
                }));
        };

        Search.prototype.CreateSelection = function () {
            var selectedResults = new Array();

            for (var i = 0; i < this.Results().length; i++) {
                var result = this.Results()[i];
                if (result.Selected())
                    selectedResults.push(result);
            }

            SelectionManager.SetNewSelectionResults(selectedResults);

            Navigation.Navigate("Selections");
        };

        Search.prototype.SearchResultSelected = function (searchResult) {
            this.HighlightedSearchResult(searchResult);
        };
        return Search;
    })();

    
    return Search;
});
