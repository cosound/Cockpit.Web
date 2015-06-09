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
            this.X1Height = knockout.observable(0);
            this.X2Height = knockout.observable(0);
            this.AudioInfo = null;
            this.HasMedia = false;
            this.Answer = knockout.observable(null);
            this.IsStimuliBlockVisible = true;
            this._alignForStimuli = true;
            this.Id = this.Model.Id;
            this.HeaderLabel = this.GetInstrumentFormatted("HeaderLabel");
            this.X1Ticks = this.GetTicks("X1AxisTicks");
            this.X2Ticks = this.GetTicks("X2AxisTicks");
            this.Y1Ticks = this.GetTicks("Y1AxisTicks");
            this.Y2Ticks = this.GetTicks("Y2AxisTicks");
            this.HasY1Ticks = this.Y1Ticks.length !== 0;
            this.HasY2Ticks = this.Y2Ticks.length !== 0;
            this.IsValueNotSet = knockout.computed(function () { return !(_this.HasAnswer() && _this.HasValidAnswer(_this.Answer())); });
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
            if (this.HasAnswer())
                this.Answer(this.GetAsnwer().Position);
            this.Answer.subscribe(function (v) {
                _this.AddEvent("Change", "/Instrument", "Mouse/Left/Down", v.toString());
                _this.SetAnswer({ Position: v });
            });
        }
        OneDScale.prototype.GetTicks = function (name) {
            var _this = this;
            var ticksContainer = this.GetInstrument(name);
            if (!ticksContainer)
                return new Array();
            var ticks = this.GetArray(ticksContainer[name.slice(0, -1)]).map(function (t) { return _this.CreateTick(t); }).filter(function (t) { return t != null; });
            return ticks;
        };
        OneDScale.prototype.CreateTick = function (data) {
            if (data.Label == null || data.Position == null) {
                console.log("OneDScale tick skipped because of missing data: " + JSON.stringify(data));
                return null;
            }
            var position = parseFloat(data.Position);
            return {
                Label: this.GetFormatted(data.Label),
                Position: position,
                RelativePosition: (position - OneDScale._positionMinValue) / (OneDScale._positionMaxValue - OneDScale._positionMinValue),
                IsMinPosition: position === OneDScale._positionMinValue,
                IsMaxPosition: position === OneDScale._positionMaxValue
            };
        };
        OneDScale._positionMinValue = -1;
        OneDScale._positionMaxValue = 1;
        return OneDScale;
    })(QuestionBase);
    return OneDScale;
});
