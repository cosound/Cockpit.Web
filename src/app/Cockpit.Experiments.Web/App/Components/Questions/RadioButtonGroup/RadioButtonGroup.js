var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout", "Components/Questions/QuestionBase"], function (require, exports, knockout, QuestionBase) {
    var RadioButtonGroup = (function (_super) {
        __extends(RadioButtonGroup, _super);
        function RadioButtonGroup(question) {
            var _this = this;
            _super.call(this, question);
            this.Answer = knockout.observable(null);
            this.Id = this.Model.Id;
            this.Label = this.GetData("Label");
            this.Url = this.GetData("Url");
            this.Items = this.GetData("Items");
            if (this.HasAnswer())
                this.Answer(this.GetAsnwer()["Value"]);
            this.Answer.subscribe(function (v) { return _this.SetAnswer({ Value: v }); });
        }
        return RadioButtonGroup;
    })(QuestionBase);
    return RadioButtonGroup;
});
//# sourceMappingURL=RadioButtonGroup.js.map