var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout", "Components/Questions/QuestionBase", "Components/Players/Audio/AudioInfo"], function (require, exports, knockout, QuestionBase, AudioInfo) {
    var CheckBoxGroup = (function (_super) {
        __extends(CheckBoxGroup, _super);
        function CheckBoxGroup(question) {
            var _this = this;
            _super.call(this, question);
            this.Answer = knockout.observableArray();
            this.HasMedia = false;
            this.Id = this.Model.Id;
            this.HeaderLabel = this.GetInstrument("HeaderLabel");
            this._minNoOfSelections = this.GetInstrument("MinNoOfSelections");
            this._maxNoOfSelections = this.GetInstrument("MaxNoOfSelections");
            var stimulus = this.GetInstrument("Stimulus");
            if (stimulus != null) {
                this.AudioLabel = stimulus.Label;
                this.AudioInfo = new AudioInfo([{ Type: stimulus.Type, Source: stimulus.URI }]);
                this.HasMedia = true;
            }
            this.CanSelectMore = knockout.computed(function () { return _this.Answer().length < _this._maxNoOfSelections; });
            this.Items = this.GetInstrument("Items").Item.map(function (v) { return _this.CreateCheckBoxInfo(v); });
            if (this.HasAnswer()) {
                if (this.GetAsnwer()["Selections"])
                    this.Answer.push.apply(this.Answer, this.GetAsnwer()["Selections"]);
                else
                    this.SetAnswer({ Selections: [] });
            }
            this.Answer.subscribe(function (v) { return _this.SetAnswer({ Selections: _this.Answer() }); });
        }
        CheckBoxGroup.prototype.HasValidAnswer = function (answer) {
            if (!answer.Selections)
                return false;
            return answer.Selections.length >= this._minNoOfSelections;
        };
        CheckBoxGroup.prototype.CreateCheckBoxInfo = function (data) {
            var _this = this;
            if (data.Selected === "1")
                this.Answer.push(data.Id);
            var info = {
                Id: data.Id,
                Label: data.Label,
                IsEnabled: knockout.computed(function () { return _this.Answer.indexOf(data.Id) !== -1 || _this.CanSelectMore(); })
            };
            return info;
        };
        return CheckBoxGroup;
    })(QuestionBase);
    return CheckBoxGroup;
});
