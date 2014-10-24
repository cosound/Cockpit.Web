var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout", "ViewModels/Questions/QuestionBase"], function(require, exports, knockout, QuestionBase) {
    var Boolean = (function (_super) {
        __extends(Boolean, _super);
        function Boolean() {
            _super.apply(this, arguments);
            this.Answer = knockout.observable();
        }
        Boolean.prototype.Initialize = function () {
            this.Id = this.Data.Id;
            this.Text = this.Data.Value;
        };
        return Boolean;
    })(QuestionBase);

    
    return Boolean;
});
//# sourceMappingURL=Boolean.js.map
