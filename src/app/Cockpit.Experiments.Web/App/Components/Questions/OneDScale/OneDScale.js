var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout", "Components/Questions/QuestionBase", "Components/Players/Audio/AudioInfo"], function (require, exports, knockout, QuestionBase, AudioInfo) {
    var OneDScale = (function (_super) {
        __extends(OneDScale, _super);
        function OneDScale(question) {
            var _this = this;
            _super.call(this, question);
            this.HasMedia = false;
            this.Answer = knockout.observable(null);
            this.Id = this.Model.Id;
            this.HeaderLabel = this.GetInstrument("HeaderLabel");
            this.X1Ticks = this.GetInstrument("X1AxisTicks") ? this.GetInstrument("X1AxisTicks").X1AxisTick : null;
            this.X2Ticks = this.GetInstrument("X2AxisTicks") ? this.GetInstrument("X2AxisTicks").X2AxisTick : null;
            this.HasX1Ticks = this.X1Ticks != null;
            this.HasX2Ticks = this.X2Ticks != null;
            this.IsValueNotSet = knockout.computed(function () { return !(_this.HasAnswer() && _this.HasValidAnswer(_this.Answer())); });
            var stimulus = this.GetInstrument("Stimulus");
            if (stimulus != null) {
                this.AudioLabel = stimulus.Label;
                this.AudioInfo = AudioInfo.Create(stimulus);
                this.TrackAudioInfo("/Instrument/Stimulus", this.AudioInfo);
                this.HasMedia = true;
            }
            this.CanAnswer = this.GetObservableWhenAllAudioHavePlayed(this.AudioInfo);
            if (this.HasAnswer())
                this.Answer(this.GetAsnwer().Position);
            this.Answer.subscribe(function (v) {
                _this.AddEvent("Change", "/Instrument", "Mouse/Left/Down", v.toString());
                _this.SetAnswer({ Position: v });
            });
        }
        return OneDScale;
    })(QuestionBase);
    return OneDScale;
});
