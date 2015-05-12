var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout", "Components/Questions/QuestionBase", "Components/Players/Audio/AudioInfo"], function (require, exports, knockout, QuestionBase, AudioInfo) {
    var KacPS = (function (_super) {
        __extends(KacPS, _super);
        function KacPS(question) {
            var _this = this;
            _super.call(this, question);
            this.Answer = knockout.observable(null);
            this.Id = this.Model.Id;
            this.HeaderLabel = this.GetInstrument("HeaderLabel");
            this.Items = this.GetItems(function (v) { return _this.CreateItemInfo(v); });
            if (this.HasAnswer())
                this.Answer(this.GetAsnwer()["Id"]);
            this.Answer.subscribe(function (v) {
                _this.AddEvent("Change", "/Instrument", "Mouse/Left/Down", v);
                _this.SetAnswer({ Id: v });
            });
        }
        KacPS.prototype.HasValidAnswer = function (answer) {
            return answer.Id != undefined && answer.Id != null;
        };
        KacPS.prototype.CreateItemInfo = function (data) {
            if (data.ChoiceButton.Selected === "1")
                this.Answer(data.Id);
            var audioInfo = AudioInfo.Create(data.Stimulus);
            if (audioInfo !== null)
                this.TrackAudioInfo("/Instrument/Items/Item(Id=" + data.Id + ")/Stimulus", audioInfo);
            var info = {
                Id: data.Id,
                Label: data.ChoiceButton.Label,
                AudioInfo: audioInfo,
                HasStimulus: data.Stimulus !== null
            };
            return info;
        };
        return KacPS;
    })(QuestionBase);
    return KacPS;
});
