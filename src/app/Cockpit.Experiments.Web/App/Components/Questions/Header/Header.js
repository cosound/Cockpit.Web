var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Managers/Experiment", "Components/Questions/QuestionBase"], function (require, exports, ExperimentManager, QuestionBase) {
    var Header = (function (_super) {
        __extends(Header, _super);
        function Header(question) {
            _super.call(this, question, false);
            ExperimentManager.Title(this.GetFormatted(this.Model.Input[0].HeaderLabel));
        }
        Header.prototype.SlideCompleted = function () {
            ExperimentManager.Title("");
            return false;
        };
        return Header;
    })(QuestionBase);
    return Header;
});
