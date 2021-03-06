var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Managers/Experiment", "Components/Questions/QuestionBase"], function (require, exports, ExperimentManager, QuestionBase) {
    var Header = (function (_super) {
        __extends(Header, _super);
        function Header(question) {
            _super.call(this, question, false);
            var inputs = this.GetInputs();
            if (inputs.length === 0 || inputs[0].HeaderLabel == undefined)
                throw new Error("HeaderLabel not found for Header");
            ExperimentManager.SlideTitle(this.GetFormatted(inputs[0].HeaderLabel));
        }
        Header.prototype.SlideCompleted = function () {
            ExperimentManager.SlideTitle("");
            return false;
        };
        return Header;
    })(QuestionBase);
    return Header;
});
