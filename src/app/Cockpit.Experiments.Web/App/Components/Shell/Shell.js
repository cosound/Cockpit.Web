define(["require", "exports", "Configuration", "Managers/Navigation"], function (require, exports, Configuration, Navigation) {
    var Shell = (function () {
        function Shell() {
            this.Page = Navigation.CurrentPage;
            this.IsPoweredByCockpitVisible = Configuration.IsPoweredByCockpitVisible;
            Navigation.Initialize();
        }
        return Shell;
    })();
    return Shell;
});
