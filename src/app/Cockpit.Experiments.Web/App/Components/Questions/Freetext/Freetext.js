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
            this.Answer = knockout.observable(null);
            this.Id = this.Model.Id;
            this.Label = this.GetData("Value");
            if (this.HasAnswer())
                this.Answer(this.GetAsnwer()["Text"]);
            this.Answer.extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 500 } });
            this.Answer.subscribe(function (v) { return _this.SetAnswer({ Text: v, Events: [] }); });
        }
        return Freetext;
    })(QuestionBase);
    return Freetext;
});
//# sourceMappingURL=Freetext.js.map