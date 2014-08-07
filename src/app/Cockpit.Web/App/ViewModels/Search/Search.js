define(["require", "exports", "knockout", "Navigation", "SelectionManager", "ViewModels/Search/SearchResult", "less!Styles/Search"], function(require, exports, knockout, Navigation, SelectionManager, SearchResult) {
    var Search = (function () {
        function Search() {
            this.Query = knockout.observable("");
            this.Results = knockout.observableArray();
            this.SelectedSearchResults = knockout.observableArray();
            this.HighlightedSearchResult = knockout.observable();
        }
        Search.prototype.Search = function () {
            this.Results.removeAll();

            for (var i = 0; i < 10; i++) {
                var result = new SearchResult(this.Query() + " Result " + i, new Date(Math.random() * 1000000000000));
                this.ListenToResult(result);
                this.Results.push(result);
            }
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

        Search.prototype.ListenToResult = function (searchResult) {
            var _this = this;
            searchResult.SetSelector(function (s) {
                return _this.SearchResultHighlighted(s);
            });
            searchResult.Selected.subscribe(function (s) {
                return _this.SearchResultSelected(searchResult);
            });
        };

        Search.prototype.SearchResultSelected = function (searchResult) {
            var isInSelected = this.SelectedSearchResults.indexOf(searchResult) != -1;

            if (searchResult.Selected()) {
                if (!isInSelected)
                    this.SelectedSearchResults.push(searchResult);
            } else {
                if (isInSelected)
                    this.SelectedSearchResults.remove(searchResult);
            }
        };

        Search.prototype.SearchResultHighlighted = function (searchResult) {
            this.HighlightedSearchResult(searchResult);
        };
        return Search;
    })();

    
    return Search;
});
