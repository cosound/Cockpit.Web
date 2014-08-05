define(["require", "exports", "knockout"], function(require, exports, knockout) {
    exports.IsAuthenticated = knockout.observable(false);

    function Authenticate() {
        exports.IsAuthenticated(true);
    }
    exports.Authenticate = Authenticate;
});
