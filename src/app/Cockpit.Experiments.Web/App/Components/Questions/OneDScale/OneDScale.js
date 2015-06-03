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
            this.AudioInfo = null;
            this.HasMedia = false;
            this.Answer = knockout.observable(null);
            this.Id = this.Model.Id;
            this.HeaderLabel = this.GetInstrumentFormatted("HeaderLabel");
            this.X1Ticks = this.GetTicks("X1AxisTicks");
            this.X2Ticks = this.GetTicks("X2AxisTicks");
            this.Y1Ticks = this.GetTicks("Y1AxisTicks");
            this.Y2Ticks = this.GetTicks("Y2AxisTicks");
            this.HasX1Ticks = this.X1Ticks.length !== 0;
            this.HasX2Ticks = this.X2Ticks.length !== 0;
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
            this.CanAnswer = this.GetObservableWhenAllAudioHavePlayed(this.AudioInfo);
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
            var ticks = this.GetArray(ticksContainer[name.slice(0, -1)]).map(function (t) { return _this.CreateTick(t); });
            ticks = ticks.sort(function (a, b) { return parseInt(a.Position) - parseInt(b.Position); });
            return ticks;
        };
        OneDScale.prototype.CreateTick = function (data) {
            return {
                Label: this.GetFormatted(data.Label),
                Position: data.Position,
                IsMinPosition: parseInt(data.Position) === OneDScale._positionMinValue,
                IsMaxPosition: parseInt(data.Position) === OneDScale._positionMaxValue
            };
        };
        OneDScale._positionMinValue = -1;
        OneDScale._positionMaxValue = 1;
        return OneDScale;
    })(QuestionBase);
    return OneDScale;
});
