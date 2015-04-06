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
            this._minNoOfSelections = this.GetInstrument("MinNoOfSelections");
            this._maxNoOfSelections = this.GetInstrument("MaxNoOfSelections");
            this.CanSelectMore = knockout.computed(function () { return _this.Answer().length < _this._maxNoOfSelections; });
            this.Items = this.GetInstrument("Items").Item.map(function (v) { return _this.CreateCheckBoxInfo(v); });
            if (this.HasAnswer())
                this.Answer.push.apply(this.Answer, this.GetAsnwer()["Selections"]);
        }
        CheckBoxGroup.prototype.CreateCheckBoxInfo = function (data) {
            var _this = this;
            var info = {
                Id: data.Id,
                Label: data.Label,
                IsEnabled: knockout.computed(function () { return _this.Answer.indexOf(data.Id) != -1 || _this.CanSelectMore(); })
            };
            return info;
        };
        return CheckBoxGroup;
    })(QuestionBase);
    return CheckBoxGroup;
});
