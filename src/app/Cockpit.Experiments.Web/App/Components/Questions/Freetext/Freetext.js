var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Components/Questions/Freetext/FreetextBase"], function (require, exports, FreetextBase) {
    var Freetext = (function (_super) {
        __extends(Freetext, _super);
        function Freetext(question) {
            var _this = this;
            _super.call(this, question);
            this.Answer.subscribe(function (v) {
                _this.AddEvent("Change", "/Instrument", "Keyboard", v);
                _this.SetAnswer(_this.SaveAnswerAnswer(v));
            });
        }
        Freetext.prototype.LoadAnswer = function (answer) {
            this.Answer(answer.Text ? answer.Text : "");
        };
        Freetext.prototype.SaveAnswerAnswer = function (answer) {
            return { Text: answer };
        };
        return Freetext;
    })(FreetextBase);
    return Freetext;
});
