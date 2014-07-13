define(["require", "exports", "Navigation", "less!Styles/Shell"], function(require, exports, Navigation) {
    var Shell = (function () {
        function Shell() {
            this.Page = Navigation.CurrentPage;
        }
        return Shell;
    })();

    
    return Shell;
});
