define(["require", "exports", "Managers/Title"], function (require, exports, Title) {
    var NotFound = (function () {
        function NotFound() {
            Title.ToDefault("Not Found");
        }
        return NotFound;
    })();
    return NotFound;
});
