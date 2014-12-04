var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout", "ViewModels/Questions/QuestionBase"], function (require, exports, knockout, QuestionBase) {
    var Boolean = (function (_super) {
        __extends(Boolean, _super);
        function Boolean(question) {
            var _this = this;
            _super.call(this, question);
            this.Answer = knockout.observable(null);
            this.Id = this.Model.Id;
            this.Text = this.GetData("Text");
            if (this.HasAnswer())
                this.Answer(this.GetAsnwer()["Value"]);
            this.Answer.subscribe(function (v) { return _this.SetAnswer({ Value: v }); });
        }
        return Boolean;
    })(QuestionBase);
    return Boolean;
});
//# sourceMappingURL=Boolean.js.map