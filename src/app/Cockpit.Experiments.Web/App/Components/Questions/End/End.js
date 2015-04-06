var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Components/Questions/QuestionBase"], function (require, exports, QuestionBase) {
    var End = (function (_super) {
        __extends(End, _super);
        function End(question) {
            _super.call(this, question, false);
        }
        End.prototype.SlideCompleted = function () {
            this.SetAnswer({ Value: new Date() });
        };
        return End;
    })(QuestionBase);
    return End;
});
