define(["require", "exports", "Models/Answer"], function(require, exports, AnswerModel) {
    var QuestionsBase = (function () {
        function QuestionsBase(question, requiresInput) {
            if (typeof requiresInput === "undefined") { requiresInput = true; }
            this.Data = question;
            this.Data.RequiresInput = requiresInput;
        }
        QuestionsBase.prototype.SetAnswer = function (data) {
            this.Data.UserAnswer(new AnswerModel(this.AnswerType, data));
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
