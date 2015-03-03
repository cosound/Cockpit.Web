define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var QuestionsBase = (function () {
        function QuestionsBase(question, requiresInput) {
            var _this = this;
            if (requiresInput === void 0) { requiresInput = true; }
            this.Model = question;
            this.Model.RequiresInput = requiresInput;
            this.HasAnswer = knockout.computed(function () { return _this.Model.Answer() != null; });
        }
        QuestionsBase.prototype.GetInstrument = function (key) {
            return this.GetIntrumentObject()[key];
        };
        QuestionsBase.prototype.GetIntrumentObject = function () {
            for (var i = 0; i < this.Model.Input.length; i++) {
                if (this.Model.Input[i].Instrument)
                    return this.Model.Input[i].Instrument;
            }
            throw new Error("Intrument object not found in input");
        };
        QuestionsBase.prototype.GetAsnwer = function () {
            return this.HasAnswer() ? this.Model.Answer() : null;
        };
        QuestionsBase.prototype.SetAnswer = function (answer) {
            this.Model.Answer(answer);
        };
        QuestionsBase.prototype.SlideLoaded = function () {
        };
        QuestionsBase.prototype.SlideCompleted = function () {
        };
        return QuestionsBase;
    })();
    return QuestionsBase;
});
//# sourceMappingURL=QuestionBase.js.map