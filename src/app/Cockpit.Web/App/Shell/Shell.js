define(["require", "exports", "knockout", "Managers/Navigation", "Managers/Authorization"], function (require, exports, knockout, Navigation, Authorization) {
    var Shell = (function () {
        function Shell() {
            Navigation.Initialize();
            this.HasCheckedAuthorization = Authorization.HasCheckedAuthorization;
            this.Page = knockout.computed(function () {
                if (Navigation.CurrentPage() == null || !Authorization.HasCheckedAuthorization())
                    return null;
                if (!Authorization.IsAuthorized())
                    return { Name: "Login", Data: null };
                return Navigation.CurrentPage();
            });
            this.Page.extend({ rateLimit: 0 });
        }
        return Shell;
    })();
    return Shell;
});
