define(["require", "exports", "knockout", "Configuration", "Managers/Navigation", "Managers/TextFormatter"], function (require, exports, knockout, Configuration, Navigation, TextFormatter) {
    var Shell = (function () {
        function Shell() {
            var _this = this;
            this.Page = Navigation.CurrentPage;
            this.FooterLabel = knockout.computed(function () { return TextFormatter.Format(Configuration.FooterLabel()); });
            this.IsFooterVisible = knockout.computed(function () { return _this.FooterLabel() != null && _this.FooterLabel() !== ""; });
            Navigation.Initialize();
        }
        return Shell;
    })();
    return Shell;
});
