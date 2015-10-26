var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "knockout", "Components/Questions/QuestionBase", "Components/Players/Audio/AudioInfo"], function (require, exports, knockout, QuestionBase, AudioInfo) {
    var KacPS = (function (_super) {
        __extends(KacPS, _super);
        function KacPS(question) {
            var _this = this;
            _super.call(this, question);
            this.Answer = knockout.observable(null);
            this.Id = this.Model.Id;
            this.HeaderLabel = this.GetInstrumentFormatted("HeaderLabel");
            this.Items = this.GetItems(function (v) { return _this.CreateItemInfo(v); });
            this.MaxButtonWidth = knockout.computed(function () { return _this.Items.map(function (i) { return i.ButtonElement() == null ? null : i.ButtonElement().offsetWidth; }).reduce(function (p, c) { return p == null || c == null ? null : Math.max(p, c); }, 0); });
            this.HasNoStimulus = this.Items.every(function (i) { return !i.HasStimulus; });
            this.CanAnswer = this.WhenAllAudioHavePlayed(this.Items.map(function (i) { return i.AudioInfo; }), true);
            if (this.HasAnswer())
                this.Answer(this.GetAnswer().Id);
            this.Answer.subscribe(function (v) {
                _this.AddEvent("Change", "/Instrument", "Mouse/Left/Down", v);
                _this.SetAnswer({ Id: v });
            });
        }
        KacPS.prototype.HasValidAnswer = function (answer) {
            return answer.Id != undefined && answer.Id != null;
        };
        KacPS.prototype.CreateItemInfo = function (data) {
            var _this = this;
            if (data.ChoiceButton.Selected === "1")
                this.Answer(data.Id);
            var audioInfo = AudioInfo.Create(data.Stimulus);
            if (audioInfo !== null)
                this.TrackAudioInfo("/Instrument/Items/Item(Id=" + data.Id + ")/Stimulus", audioInfo);
            var info = {
                Id: data.Id,
                UniqueId: this.Id + "_" + data.Id,
                Label: this.GetFormatted(data.ChoiceButton.Label),
                AudioInfo: audioInfo,
                IsSelected: knockout.computed(function () { return _this.Answer() === data.Id; }),
                HasStimulus: data.Stimulus !== null,
                ButtonElement: knockout.observable(null)
            };
            return info;
        };
        return KacPS;
    })(QuestionBase);
    return KacPS;
});
