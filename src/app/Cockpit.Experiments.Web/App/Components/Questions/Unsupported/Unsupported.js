var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Components/Questions/QuestionBase"], function (require, exports, QuestionBase) {
    var Unsupported = (function (_super) {
        __extends(Unsupported, _super);
        function Unsupported(question) {
            _super.call(this, question, false);
            console.log("Unsupported question type: " + question.APIType);
        }
        return Unsupported;
    })(QuestionBase);
    return Unsupported;
});
