define(["require", "exports", "knockout", "Navigation", "SelectionManager", "ViewModels/Search/SearchResult"], function(require, exports, knockout, Navigation, SelectionManager, SearchResult) {
    var Search = (function () {
        function Search() {
            this.Query = knockout.observable("");
            this.Results = knockout.observableArray();
        }
        Search.prototype.Search = function () {
            this.Results.removeAll();

            for (var i = 0; i < 20; i++)
                this.Results.push(new SearchResult(this.Query() + " Result " + i));
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
        return Search;
    })();

    
    return Search;
});
