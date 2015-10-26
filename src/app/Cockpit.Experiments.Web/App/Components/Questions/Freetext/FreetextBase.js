var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
                this.Answer(this.LoadText(this.GetAnswer()));
            this.Answer.extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 200 } });
            this.Answer.subscribe(function (v) { return _this.UpdateAnswer(v); });
        }
        FreetextBase.prototype.UpdateAnswer = function (text) {
            this.SetAnswer(this.SaveText(text));
        };
        FreetextBase.prototype.LoadText = function (answer) {
            throw new Error("Not implemented");
        };
        FreetextBase.prototype.SaveText = function (answer) {
            throw new Error("Not implemented");
        };
        FreetextBase.prototype.HasValidAnswer = function (answer) {
            if (!this._validation)
                return true;
            var text = answer == null ? "" : this.LoadText(answer);
            return this._validation.test(text);
        };
        return FreetextBase;
    })(QuestionBase);
    return FreetextBase;
});
