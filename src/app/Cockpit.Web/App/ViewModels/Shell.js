define(["require", "exports", "Navigation", "AuthenticationManager", "less!Styles/Shell"], function(require, exports, Navigation, AuthenticationManager) {
    var Shell = (function () {
        function Shell() {
            this.Page = Navigation.CurrentPage;
            this.IsAuthenticated = AuthenticationManager.IsAuthenticated;
        }
        return Shell;
    })();

    
    return Shell;
});
