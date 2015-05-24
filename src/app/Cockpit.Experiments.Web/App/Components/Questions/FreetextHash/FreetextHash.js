var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Components/Questions/Freetext/Freetext", "crypto-js"], function (require, exports, FreeText, CryptoJS) {
    var FreetextHash = (function (_super) {
        __extends(FreetextHash, _super);
        function FreetextHash(question) {
            _super.call(this, question);
            this._forceLowerCase = this.GetInstrument("ForceLower") === 1;
        }
        FreetextHash.prototype.LoadAnswer = function (answer) {
        };
        FreetextHash.prototype.SaveAnswerAnswer = function (answer) {
            return { Value: CryptoJS.MD5(this._forceLowerCase ? answer.toLocaleLowerCase() : answer).toString(), Length: answer.length };
        };
        return FreetextHash;
    })(FreeText);
    return FreetextHash;
});
