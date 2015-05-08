var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout", "Components/Questions/QuestionBase"], function (require, exports, knockout, QuestionBase) {
    var Freetext = (function (_super) {
        __extends(Freetext, _super);
        function Freetext(question) {
            var _this = this;
            _super.call(this, question);
            this.Label = "";
            this.Answer = knockout.observable(null);
            this.Id = this.Model.Id;
            if (this.HasInstrument())
                this.Label = this.GetInstrument("Label");
            if (this.HasAnswer())
                this.Answer(this.GetAsnwer()["Text"]);
            this.Answer.extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 200 } });
            this.Answer.subscribe(function (v) { return _this.SetAnswer({ Text: v }); });
        }
        Freetext.prototype.HasValidAnswer = function (answer) {
            if (!answer.Text)
                return false;
            return answer.Text !== "";
        };
        return Freetext;
    })(QuestionBase);
    return Freetext;
});
