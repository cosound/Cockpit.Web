var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout", "Components/Questions/QuestionBase"], function (require, exports, knockout, QuestionBase) {
    var CheckBoxGroup = (function (_super) {
        __extends(CheckBoxGroup, _super);
        function CheckBoxGroup(question) {
            var _this = this;
            _super.call(this, question);
            this.Answer = knockout.observableArray();
            this.Id = this.Model.Id;
            this.Label = this.GetInstrument("HeaderLabel");
            this.Url = this.GetInstrument("Stimulus");
            this.Items = this.GetInstrument("Items").Item;
            if (this.HasAnswer())
                this.Answer.push.apply(this.Answer, this.GetAsnwer()["Selections"]);
            this.Answer.subscribe(function (v) { return _this.SetAnswer({ Selections: _this.Answer() }); });
        }
        return CheckBoxGroup;
    })(QuestionBase);
    return CheckBoxGroup;
});
