var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Components/Questions/Freetext/FreetextBase"], function (require, exports, FreetextBase) {
    var Freetext = (function (_super) {
        __extends(Freetext, _super);
        function Freetext(question) {
            _super.call(this, question);
        }
        Freetext.prototype.UpdateAnswer = function (text) {
            this.AddEvent("Change", "/Instrument", "Keyboard", text);
            _super.prototype.UpdateAnswer.call(this, text);
        };
        Freetext.prototype.LoadText = function (answer) {
            return answer == null || answer.Text == null ? "" : answer.Text;
        };
        Freetext.prototype.SaveText = function (answer) {
            return { Text: answer };
        };
        return Freetext;
    })(FreetextBase);
    return Freetext;
});
