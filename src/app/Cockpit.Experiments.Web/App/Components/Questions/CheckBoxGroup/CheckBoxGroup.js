var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "knockout", "Components/Questions/QuestionBase", "Components/Players/Audio/AudioInfo"], function (require, exports, knockout, QuestionBase, AudioInfo) {
    var CheckBoxGroup = (function (_super) {
        __extends(CheckBoxGroup, _super);
        function CheckBoxGroup(question) {
            var _this = this;
            _super.call(this, question);
            this.AudioInfo = null;
            this.Answer = knockout.observableArray();
            this.HasMedia = false;
            this.Id = this.Model.Id;
            this.HeaderLabel = this.GetInstrumentFormatted("HeaderLabel");
            this._minNoOfSelections = parseInt(this.GetInstrument("MinNoOfSelections"));
            this._maxNoOfSelections = parseInt(this.GetInstrument("MaxNoOfSelections"));
            var stimulus = this.GetStimulusInstrument("Stimulus");
            if (stimulus != null) {
                this.AudioLabel = this.GetFormatted(stimulus.Label);
                this.AudioInfo = new AudioInfo([{ Type: stimulus.Type, Source: stimulus.URI }]);
                this.TrackAudioInfo("/Instrument/Stimulus", this.AudioInfo);
                this.HasMedia = true;
            }
            this.CanAnswer = this.WhenAllAudioHavePlayed(this.AudioInfo, true);
            this.CanSelectMore = knockout.computed(function () { return _this.Answer().length < _this._maxNoOfSelections; });
            this.Items = this.GetItems(function (v) { return _this.CreateItemInfo(v); });
            this.RowedItems = this.RowItems(this.Items, 4);
            this.AddOneFillerItem = knockout.computed(function () { return _this.Items.length === 2; });
            this.AddHalfFillerItem = knockout.computed(function () { return _this.Items.length === 3; });
            this.AddFillerItem = knockout.computed(function () { return _this.AddOneFillerItem() || _this.AddHalfFillerItem(); });
            if (this.HasAnswer()) {
                if (this.GetAnswer()["Selections"])
                    this.Answer.push.apply(this.Answer, this.GetAnswer().Selections);
            }
            else
                this.SetAnswer({ Selections: [] });
            this.Answer.subscribe(function (v) {
                _this.AddEvent("Change", "/Instrument", "Mouse/Left/Down", v.join(","));
                _this.SetAnswer({ Selections: v });
            });
        }
        CheckBoxGroup.prototype.HasValidAnswer = function (answer) {
            if (this._minNoOfSelections === 0)
                return true;
            if (!answer.Selections)
                return false;
            return answer.Selections.length >= this._minNoOfSelections;
        };
        CheckBoxGroup.prototype.CreateItemInfo = function (data) {
            var _this = this;
            if (data.Selected === "1")
                this.Answer.push(data.Id);
            var info = {
                Id: data.Id,
                Label: this.GetFormatted(data.Label),
                IsEnabled: knockout.computed(function () { return _this.CanAnswer() && (_this.Answer.indexOf(data.Id) !== -1 || _this.CanSelectMore()); })
            };
            return info;
        };
        return CheckBoxGroup;
    })(QuestionBase);
    return CheckBoxGroup;
});
