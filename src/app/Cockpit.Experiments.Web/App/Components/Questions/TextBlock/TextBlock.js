var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Components/Questions/QuestionBase"], function (require, exports, QuestionBase) {
    var TextBlock = (function (_super) {
        __extends(TextBlock, _super);
        function TextBlock(question) {
            _super.call(this, question, false);
            this.HeaderLabel = this.GetInstrumentFormatted("HeaderLabel");
            this.HasHeader = this.HeaderLabel != null && this.HeaderLabel !== "";
            this.Text = this.GetInstrumentFormatted("Text");
        }
        return TextBlock;
    })(QuestionBase);
    return TextBlock;
});
