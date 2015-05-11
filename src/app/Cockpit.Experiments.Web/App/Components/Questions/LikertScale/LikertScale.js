var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout", "Components/Questions/QuestionBase", "Components/Players/Audio/AudioInfo"], function (require, exports, knockout, QuestionBase, AudioInfo) {
    var LikertScale = (function (_super) {
        __extends(LikertScale, _super);
        function LikertScale(question) {
            var _this = this;
            _super.call(this, question);
            this.Answer = knockout.observableArray();
            this.HasMedia = false;
            this.HeaderLabel = this.GetInstrument("HeaderLabel");
            this._minNoOfSelections = parseInt(this.GetInstrument("MinNoOfScalings"));
            this._maxNoOfSelections = parseInt(this.GetInstrument("MaxNoOfScalings"));
            var stimulus = this.GetInstrument("Stimulus");
            if (stimulus != null) {
                this.AudioLabel = stimulus.Label;
                this.AudioInfo = AudioInfo.Create(stimulus);
                this.TrackAudioInfo("/Instrument/Stimulus", this.AudioInfo);
                this.HasMedia = true;
            }
            this.CanSelectMore = knockout.computed(function () { return _this.Answer().length < _this._maxNoOfSelections; });
            this.Items = this.GetItems(function (item) { return _this.CreateCheckBoxInfo(item); });
            if (this.HasAnswer()) {
                if (this.GetAsnwer()["Selections"])
                    this.Answer.push.apply(this.Answer, this.GetAsnwer()["Selections"]);
                else
                    this.SetAnswer({ Selections: [] });
            }
            this.Answer.subscribe(function (v) {
                _this.AddEvent("Change", "/Instrument", "Mouse/Left/Down", v.join(","));
                _this.SetAnswer({ Selections: v });
            });
        }
        LikertScale.prototype.HasValidAnswer = function (answer) {
            if (!answer.Selections)
                return false;
            return answer.Selections.length >= this._minNoOfSelections;
        };
        LikertScale.prototype.CreateCheckBoxInfo = function (data) {
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
        return LikertScale;
    })(QuestionBase);
    return LikertScale;
});
