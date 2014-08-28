define(["require", "exports", "knockout", "ViewModels/Selections/Selection"], function(require, exports, knockout, Selection) {
    exports.Selections = knockout.observableArray();

    function SetNewSelectionResults(results) {
        exports.Selections.unshift(new Selection(null, results));
    }
    exports.SetNewSelectionResults = SetNewSelectionResults;
});
