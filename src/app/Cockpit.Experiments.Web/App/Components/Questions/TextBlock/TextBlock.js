var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Components/Questions/QuestionBase"], function (require, exports, QuestionBase) {
    var TextBlock = (function (_super) {
        __extends(TextBlock, _super);
        function TextBlock(question) {
            _super.call(this, question);
            this.Text = this.GetInstrument("Text");
        }
        return TextBlock;
    })(QuestionBase);
    return TextBlock;
});
//# sourceMappingURL=TextBlock.js.map