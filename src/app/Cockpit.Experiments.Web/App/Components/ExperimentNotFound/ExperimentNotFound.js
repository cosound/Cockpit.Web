define(["require", "exports"], function (require, exports) {
    var ExperimentNotFound = (function () {
        function ExperimentNotFound(data) {
            console.log(data);
            this.Id = data;
        }
        return ExperimentNotFound;
    })();
    return ExperimentNotFound;
});
