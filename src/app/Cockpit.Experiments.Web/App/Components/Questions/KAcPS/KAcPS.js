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
            this.Answer = knockout.observableArray();
            this.HeaderLabel = this.GetInstrument("HeaderLabel");
            this._minNoOfSelections = parseInt(this.GetInstrument("MinNoOfScalings"));
            this._maxNoOfSelections = parseInt(this.GetInstrument("MaxNoOfScalings"));
            this.CanSelectMore = knockout.computed(function () { return _this.Answer().length < _this._maxNoOfSelections; });
            this.Items = this.GetItems(function (v) { return _this.CreateItemInfo(v); });
            if (this.HasAnswer()) {
                if (this.GetAsnwer()["Selections"])
                    this.Answer.push.apply(this.Answer, this.GetAsnwer()["Selections"]);
                else
                    this.SetAnswer({ Selections: [] });
            }
            this.Answer.subscribe(function (v) { return _this.SetAnswer({ Selections: _this.Answer() }); });
        }
        KacPS.prototype.HasValidAnswer = function (answer) {
            if (!answer.Selections)
                return false;
            return answer.Selections.length >= this._minNoOfSelections;
        };
        KacPS.prototype.CreateItemInfo = function (data) {
            var _this = this;
            if (data.ChoiceButton.Selected === "1")
                this.Answer.push(data.Id);
            var info = {
                Id: data.Id,
                Label: data.ChoiceButton.Label,
                AudioInfo: AudioInfo.Create(data.Stimulus),
                IsEnabled: knockout.computed(function () { return _this.Answer.indexOf(data.Id) !== -1 || _this.CanSelectMore(); }),
                HasStimulus: data.Stimulus !== null
            };
            return info;
        };
        return KacPS;
    })(QuestionBase);
    return KacPS;
});
