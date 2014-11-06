var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout", "ViewModels/Questions/QuestionBase"], function (require, exports, knockout, QuestionBase) {
    var AB = (function (_super) {
        __extends(AB, _super);
        function AB(question) {
            var _this = this;
            _super.call(this, question);
            this.Answer = knockout.observable(null);
            this.Id = this.Data.Id;
            this.Text = this.Data.Data["Text"];
            this.Url1 = this.Data.Data["Url1"];
            this.Url2 = this.Data.Data["Url2"];
            this.AnswerType = "ABAnswer, 1.0";
            this.Answer.subscribe(function (v) { return _this.SetAnswer({ Value: v }); });
        }
        return AB;
    })(QuestionBase);
    return AB;
});
//# sourceMappingURL=AB.js.map