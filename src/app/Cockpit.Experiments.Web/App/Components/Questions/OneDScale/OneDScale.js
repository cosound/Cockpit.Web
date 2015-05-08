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
            this.Label = this.GetInstrument("HeaderLabel");
            this.MinLabel = this.GetInstrument("X1AxisLabel");
            this.MaxLabel = this.GetInstrument("Y1AxisLabel");
            var stimulus = this.GetInstrument("Stimulus");
            if (stimulus != null) {
                this.AudioInfo = AudioInfo.Create(stimulus);
                this.AudioInfo.AddIsPlayingCallback(function (isPlaying) { return _this.AddEvent(isPlaying ? "Start" : "Stop"); });
                this.HasMedia = true;
            }
            if (this.HasAnswer())
                this.Answer(this.GetAsnwer().Position);
            this.Answer.subscribe(function (v) { return _this.SetAnswer({ Position: v }); });
        }
        return OneDScale;
    })(QuestionBase);
    return OneDScale;
});
