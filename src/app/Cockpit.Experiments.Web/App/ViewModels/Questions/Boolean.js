var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ViewModels/Questions/QuestionBase"], function(require, exports, QuestionBase) {
    var Boolean = (function (_super) {
        __extends(Boolean, _super);
        function Boolean() {
            _super.apply(this, arguments);
        }
        Boolean.prototype.Initialize = function () {
            this.Id = this.Data.Id;
            this.Text = this.Data.Value;

            this.Answer = this.UserInput;
        };
        return Boolean;
    })(QuestionBase);

    
    return Boolean;
});
//# sourceMappingURL=Boolean.js.map
