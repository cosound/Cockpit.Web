var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ViewModels/Questions/QuestionBase"], function (require, exports, QuestionBase) {
    var Start = (function (_super) {
        __extends(Start, _super);
        function Start(question) {
            _super.call(this, question);
            this.SetAnswer({ Value: new Date() });
        }
        return Start;
    })(QuestionBase);
    return Start;
});
//# sourceMappingURL=Start.js.map