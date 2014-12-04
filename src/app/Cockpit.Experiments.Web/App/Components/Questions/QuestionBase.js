define(["require", "exports", "knockout", "Models/Answer"], function (require, exports, knockout, AnswerModel) {
    var QuestionsBase = (function () {
        function QuestionsBase(question, requiresInput) {
            var _this = this;
            if (requiresInput === void 0) { requiresInput = true; }
            this.Model = question;
            this.Model.RequiresInput = requiresInput;
            this.HasAnswer = knockout.computed(function () { return _this.Model.UserAnswer() != null; });
        }
        QuestionsBase.prototype.GetData = function (key) {
            return this.Model.Data[key];
        };
        QuestionsBase.prototype.GetAsnwer = function () {
            return this.HasAnswer() ? this.Model.UserAnswer().Data : null;
        };
        QuestionsBase.prototype.SetAnswer = function (data) {
            var id = this.Model.UserAnswer() == null ? null : this.Model.UserAnswer().Id;
            this.Model.UserAnswer(new AnswerModel(id, data));
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