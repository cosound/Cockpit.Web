var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ViewModels/Questions/QuestionBase"], function(require, exports, QuestionBase) {
    var Introduction = (function (_super) {
        __extends(Introduction, _super);
        function Introduction(question) {
            _super.call(this, question);

            this.Id = this.Data.Id;
            this.Header = this.Data.Data["labelHeader"];
            this.Text = this.Data.Data["textContent"];
            this.ImageUrl = this.Data.Data["imageObject"];
        }
        return Introduction;
    })(QuestionBase);

    
    return Introduction;
});
//# sourceMappingURL=Introduction.js.map
