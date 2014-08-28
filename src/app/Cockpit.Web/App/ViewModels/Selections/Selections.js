define(["require", "exports", "knockout", "ViewModels/Selections/SelectionManager", "less!Styles/Selections"], function(require, exports, knockout, SelectionManager) {
    var Selections = (function () {
        function Selections() {
            var _this = this;
            this.HighlightedSelection = knockout.observable();
            this.Selections = SelectionManager.Selections;

            if (SelectionManager.Selections().length != 0)
                this.HighlightedSelection(SelectionManager.Selections()[0]);

            for (var i = 0; i < SelectionManager.Selections().length; i++)
                SelectionManager.Selections()[i].SetSelector(function (s) {
                    return _this.SearchResultSelected(s);
                });
        }
        Selections.prototype.SearchResultSelected = function (selection) {
            this.HighlightedSelection(selection);
        };
        return Selections;
    })();

    
    return Selections;
});
