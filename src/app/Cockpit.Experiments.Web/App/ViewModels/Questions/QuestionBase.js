define(["require", "exports", "knockout", "Models/Answer"], function(require, exports, knockout, AnswerModel) {
    var QuestionsBase = (function () {
        function QuestionsBase(question, requiresInput) {
            if (typeof requiresInput === "undefined") { requiresInput = true; }
            var _this = this;
            this.Data = question;
            this.Data.RequiresInput = requiresInput;
            this.HasAnswer = knockout.computed(function () {
                return _this.Data.UserAnswer() != null;
            });
        }
        QuestionsBase.prototype.GetAsnwer = function () {
            return this.HasAnswer() ? this.Data.UserAnswer().Data : null;
        };

        QuestionsBase.prototype.SetAnswer = function (data) {
            var id = this.Data.UserAnswer() == null ? null : this.Data.UserAnswer().Id;
            this.Data.UserAnswer(new AnswerModel(id, data));
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
