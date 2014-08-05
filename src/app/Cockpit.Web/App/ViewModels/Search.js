﻿define(["require", "exports", "knockout", "ViewModels/SearchResult"], function(require, exports, knockout, SearchResult) {
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

            sessionStorage.setItem("");
        };
        return Search;
    })();

    
    return Search;
});
