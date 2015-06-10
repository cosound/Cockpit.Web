var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout", "Components/Questions/QuestionBase"], function (require, exports, knockout, QuestionBase) {
    var FreetextBase = (function (_super) {
        __extends(FreetextBase, _super);
        function FreetextBase(question) {
            var _this = this;
            _super.call(this, question);
            this.Label = "";
            this.Answer = knockout.observable(null);
            this.LabelPosition = "left";
            this.LabelPositionLeft = false;
            this.LabelPositionTop = false;
            this.LabelPositionRight = false;
            this.LabelPositionBottom = false;
            this.Id = this.Model.Id;
            if (this.HasInstrument()) {
                this.Label = this.GetInstrumentFormatted("Label");
                var validation = this.GetInstrument("Validation");
                if (validation)
                    this._validation = new RegExp(validation);
            }
            this.LabelPosition = this.GetInstrument("LabelPosition");
            switch (this.LabelPosition) {
                case "left":
                    this.LabelPositionLeft = true;
                    break;
                case "top":
                    this.LabelPositionTop = true;
                    break;
                case "right":
                    this.LabelPositionRight = true;
                    break;
                case "bottom":
                    this.LabelPositionBottom = true;
                    break;
            }
            if (this.HasAnswer())
                this.LoadAnswer(this.GetAnswer());
            this.Answer.extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 200 } });
            this.Answer.subscribe(function (v) {
                _this.AddEvent("Change", "/Instrument", "Keyboard", v);
                _this.SetAnswer(_this.SaveAnswerAnswer(v));
            });
        }
        FreetextBase.prototype.LoadAnswer = function (answer) {
            throw new Error("Not implemented");
        };
        FreetextBase.prototype.SaveAnswerAnswer = function (answer) {
            throw new Error("Not implemented");
        };
        FreetextBase.prototype.HasValidAnswer = function (answer) {
            if (!this._validation)
                return true;
            if (answer === null)
                answer = "";
            return this._validation.test(answer);
        };
        return FreetextBase;
    })(QuestionBase);
    return FreetextBase;
});
