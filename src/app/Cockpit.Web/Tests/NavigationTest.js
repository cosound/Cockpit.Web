define(["require", "exports", "Navigation"], function(require, exports, Navigation) {
    function Run() {
        test("CurrentPage should be initialized as null", function () {
            ok(Navigation.CurrentPage);
            ok(Navigator.CurrentPage() != null);
        });
    }
    exports.Run = Run;
});
