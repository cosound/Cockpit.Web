define(["require", "exports", "Models/Answer"], function(require, exports, AnswerModel) {
    var QuestionsBase = (function () {
        function QuestionsBase(question) {
            this.Data = question;
        }
        QuestionsBase.prototype.SetAnswer = function (data) {
            this.Data.UserAnswer(new AnswerModel(this.AnswerType, data));
        };
        return QuestionsBase;
    })();

    
    return QuestionsBase;
});
//# sourceMappingURL=QuestionBase.js.map
