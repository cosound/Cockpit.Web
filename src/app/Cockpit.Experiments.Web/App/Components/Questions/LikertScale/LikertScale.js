var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "knockout", "Components/Questions/QuestionBase", "Components/Players/Audio/AudioInfo"], function (require, exports, knockout, QuestionBase, AudioInfo) {
    var LikertScale = (function (_super) {
        __extends(LikertScale, _super);
        function LikertScale(question) {
            var _this = this;
            _super.call(this, question);
            this.AudioInfo = null;
            this.Answer = knockout.observable(null);
            this.HasMedia = false;
            this.AnswerIsRequired = true;
            this.IsStimuliBlockVisible = true;
            this._alignForStimuli = true;
            this.Id = this.Model.Id;
            this.HeaderLabel = this.GetInstrumentFormatted("HeaderLabel");
            var stimulus = this.GetInstrument("Stimulus");
            if (stimulus != null) {
                this.AudioLabel = this.GetFormatted(stimulus.Label);
                this.AudioInfo = AudioInfo.Create(stimulus);
                this.TrackAudioInfo("/Instrument/Stimulus", this.AudioInfo);
                this.HasMedia = true;
            }
            var alignForStimuli = this.GetInstrument("AlignForStimuli");
            this._alignForStimuli = alignForStimuli === undefined || alignForStimuli === "1";
            this.IsStimuliBlockVisible = this._alignForStimuli || this.HasMedia;
            this.CanAnswer = this.WhenAllAudioHavePlayed(this.AudioInfo, true);
            this.AnswerIsRequired = this.GetInstrument("MinNoOfScalings") !== "0";
            this.Items = this.GetItems(function (item) { return _this.ItemInfo(item); });
            if (this.HasAnswer())
                this.Answer(this.GetAnswer().Id);
            this.Answer.subscribe(function (v) {
                _this.AddEvent("Change", "/Instrument", "Mouse/Left/Down", v);
                _this.SetAnswer({ Id: v });
            });
        }
        LikertScale.prototype.HasValidAnswer = function (answer) {
            return !this.AnswerIsRequired || answer.Id != undefined && answer.Id != null;
        };
        LikertScale.prototype.ItemInfo = function (data) {
            if (data.Selected === "1")
                this.Answer(data.Id);
            var info = {
                Id: data.Id,
                Label: this.GetFormatted(data.Label)
            };
            return info;
        };
        return LikertScale;
    })(QuestionBase);
    return LikertScale;
});
