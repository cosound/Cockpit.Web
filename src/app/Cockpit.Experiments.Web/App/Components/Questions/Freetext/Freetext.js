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
            if (this.HasInstrument()) {
                this.Label = this.GetInstrumentFormatted("Label");
                var validation = this.GetInstrument("Validation");
                if (validation)
                    this._validation = new RegExp(validation);
            }
            if (this.HasAnswer())
                this.LoadAnswer(this.GetAsnwer());
            this.Answer.extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 200 } });
            this.Answer.subscribe(function (v) {
                _this.AddEvent("Change", "/Instrument", "Keyboard", v);
                _this.SetAnswer(_this.SaveAnswerAnswer(v));
            });
        }
        Freetext.prototype.LoadAnswer = function (answer) {
            this.Answer(answer["Text"]);
        };
        Freetext.prototype.SaveAnswerAnswer = function (answer) {
            return { Text: answer };
        };
        Freetext.prototype.HasValidAnswer = function (answer) {
            if (!this._validation)
                return true;
            if (answer === null)
                answer = "";
            return this._validation.test(answer);
        };
        return Freetext;
    })(QuestionBase);
    return Freetext;
});
