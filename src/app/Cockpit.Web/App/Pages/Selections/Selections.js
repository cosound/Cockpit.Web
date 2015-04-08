define(["require", "exports", "knockout", "Managers/Title", "Managers/Selections"], function (require, exports, knockout, Title, SelectionsManager) {
    var Selections = (function () {
        function Selections() {
            this.NewSelectionName = knockout.observable("");
            Title.ToDefault("Selections");
            this.Selections = SelectionsManager.Selections;
        }
        Selections.prototype.Add = function () {
            var _this = this;
            SelectionsManager.Create(this.NewSelectionName(), function (success) {
                if (success)
                    _this.NewSelectionName("");
            });
        };
        return Selections;
    })();
    return Selections;
});
