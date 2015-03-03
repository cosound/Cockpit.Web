var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Components/Questions/QuestionBase"], function (require, exports, QuestionBase) {
    var Introduction = (function (_super) {
        __extends(Introduction, _super);
        function Introduction(question) {
            _super.call(this, question, false);
            this.Id = this.Model.Id;
            this.Header = this.GetInstrument("labelHeader");
            this.Text = this.GetInstrument("textContent");
            this.ImageUrl = this.GetInstrument("imageObject");
        }
        return Introduction;
    })(QuestionBase);
    return Introduction;
});
//# sourceMappingURL=Introduction.js.map