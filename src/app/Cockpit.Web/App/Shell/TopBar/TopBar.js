define(["require", "exports", "knockout", "Managers/Navigation", "Managers/Authorization"], function (require, exports, knockout, Navigation, Authorization) {
    var TopBar = (function () {
        function TopBar() {
            this.IsAuthorized = Authorization.IsAuthorized;
            this.CurrentPageName = knockout.computed(function () { return Navigation.CurrentPage() == null ? "" : Navigation.CurrentPage().Name; });
        }
        return TopBar;
    })();
    return TopBar;
});
