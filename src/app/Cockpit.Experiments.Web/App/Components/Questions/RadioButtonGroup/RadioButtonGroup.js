var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout", "Components/Questions/QuestionBase", "Components/Players/Audio/AudioInfo"], function (require, exports, knockout, QuestionBase, AudioInfo) {
    var RadioButtonGroup = (function (_super) {
        __extends(RadioButtonGroup, _super);
        function RadioButtonGroup(question) {
            var _this = this;
            _super.call(this, question);
            this.Answer = knockout.observable(null);
            this.HasMedia = false;
            this.Id = this.Model.Id;
            this.HeaderLabel = this.GetInstrument("HeaderLabel");
            var stimulus = this.GetInstrument("Stimulus");
            if (stimulus != null) {
                this.AudioLabel = stimulus.Label;
                this.AudioInfo = AudioInfo.Create(stimulus);
                this.TrackAudioInfo("/Instrument/Stimulus", this.AudioInfo);
                this.HasMedia = true;
            }
            this.Items = this.GetItems(function (item) { return _this.ItemInfo(item); });
            if (this.HasAnswer())
                this.Answer(this.GetAsnwer()["Id"]);
            this.Answer.subscribe(function (v) {
                _this.AddEvent("Change", "/Instrument", "Mouse/Left/Down", v);
                _this.SetAnswer({ Id: v });
            });
        }
        RadioButtonGroup.prototype.HasValidAnswer = function (answer) {
            return answer.Id != undefined && answer.Id != null;
        };
        RadioButtonGroup.prototype.ItemInfo = function (data) {
            if (data.Selected === "1")
                this.Answer(data.Id);
            var info = {
                Id: data.Id,
                Label: data.Label
            };
            return info;
        };
        return RadioButtonGroup;
    })(QuestionBase);
    return RadioButtonGroup;
});
