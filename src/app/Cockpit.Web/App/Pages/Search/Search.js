define(["require", "exports", "Managers/Title"], function (require, exports, Title) {
    var Search = (function () {
        function Search() {
            Title.ToDefault("Search");
        }
        return Search;
    })();
    return Search;
});
