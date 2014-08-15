define(["require", "exports", "Navigation"], function(require, exports, Navigation) {
    var Shell = (function () {
        function Shell() {
            this.Page = Navigation.CurrentPage;

            Navigation.Initialize();
        }
        return Shell;
    })();

    
    return Shell;
});
//# sourceMappingURL=Shell.js.map
