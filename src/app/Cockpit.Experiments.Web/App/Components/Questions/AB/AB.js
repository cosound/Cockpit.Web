var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout", "Components/Questions/QuestionBase"], function (require, exports, knockout, QuestionBase) {
    var AB = (function (_super) {
        __extends(AB, _super);
        function AB(question) {
            var _this = this;
            _super.call(this, question);
            this.Answer = knockout.observable(null);
            this.Id = this.Model.Id;
            this.Text = this.GetInstrument("Text");
            this.Url1 = this.GetInstrument("Url1");
            this.Url2 = this.GetInstrument("Url2");
            if (this.HasAnswer())
                this.Answer(this.GetAsnwer()["Value"]);
            this.Answer.subscribe(function (v) { return _this.SetAnswer({ Value: v }); });
        }
        return AB;
    })(QuestionBase);
    return AB;
});
