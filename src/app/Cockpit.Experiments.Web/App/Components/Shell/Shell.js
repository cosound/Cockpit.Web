define(["require", "exports", "knockout", "Managers/Navigation", "Managers/TextFormatter", "Managers/Experiment"], function (require, exports, knockout, Navigation, TextFormatter, ExperimentManager) {
    var Shell = (function () {
        function Shell() {
            var _this = this;
            this.Page = Navigation.CurrentPage;
            this.FooterLabel = knockout.computed(function () { return TextFormatter.Format(ExperimentManager.FooterLabel()); });
            this.IsFooterVisible = knockout.computed(function () { return _this.FooterLabel() != null && _this.FooterLabel() !== ""; });
        }
        return Shell;
    })();
    return Shell;
});
