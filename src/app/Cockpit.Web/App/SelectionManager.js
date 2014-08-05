define(["require", "exports"], function(require, exports) {
    var results;

    function SetNewSelectionResults(results) {
        this.results = results;
    }
    exports.SetNewSelectionResults = SetNewSelectionResults;

    function GetNewSelectionResults() {
        return results;
    }
    exports.GetNewSelectionResults = GetNewSelectionResults;
});
