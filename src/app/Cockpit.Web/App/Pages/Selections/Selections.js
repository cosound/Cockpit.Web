define(["require", "exports", "Managers/Title"], function (require, exports, Title) {
    var Selections = (function () {
        function Selections() {
            Title.ToDefault("Search");
        }
        return Selections;
    })();
    return Selections;
});
