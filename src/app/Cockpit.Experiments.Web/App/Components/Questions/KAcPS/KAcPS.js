var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Components/Questions/QuestionBase"], function (require, exports, QuestionBase) {
    var KAcPS = (function (_super) {
        __extends(KAcPS, _super);
        function KAcPS(question) {
            _super.call(this, question);
        }
        KAcPS.prototype.HasValidAnswer = function (answer) {
            return true;
        };
        return KAcPS;
    })(QuestionBase);
    return KAcPS;
});
