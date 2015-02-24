define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var QuestionsBase = (function () {
        function QuestionsBase(question, requiresInput) {
            var _this = this;
            if (requiresInput === void 0) { requiresInput = true; }
            this.Model = question;
            this.Model.RequiresInput = requiresInput;
            this.HasAnswer = knockout.computed(function () { return _this.Model.Answer() != null; });
        }
        QuestionsBase.prototype.GetData = function (key) {
            return this.Model.Data[key];
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