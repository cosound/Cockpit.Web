var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ViewModels/Questions/QuestionBase"], function(require, exports, QuestionBase) {
    var AB = (function (_super) {
        __extends(AB, _super);
        function AB() {
            _super.apply(this, arguments);
        }
        AB.prototype.Initialize = function () {
            this.Id = this.Data.Id;
            this.Text = this.Data.Text;
            this.Url1 = this.Data.Url1;
            this.Url2 = this.Data.Url2;

            this.Answer = this.UserInput;
        };
        return AB;
    })(QuestionBase);

    
    return AB;
});
//# sourceMappingURL=AB.js.map
