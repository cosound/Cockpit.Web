define(["require", "exports", "knockout", "QuestionMap"], function (require, exports, knockout, QuestionMap) {
    var Question = (function () {
        function Question(question, answerChangedCallback) {
            var _this = this;
            this.Data = {};
            this.UserAnswer = knockout.observable();
            this.HasInput = true;
            var questionMap = QuestionMap.Map[question.Type];
            if (!questionMap)
                throw new Error("Question map for " + question.Type + " not found");
            this.Id = question.Id;
            this.Type = questionMap.Type;
            this.HasUIElement = questionMap.HasUIElement;
            if (question.Data) {
                for (var i = 0; i < question.Data.length; i++) {
                    var data = question.Data[i];
                    var key = data.substring(1, data.indexOf(","));
                    this.Data[key] = data.substring(key.length + 3, data.length - 1);
                }
            }
            this.UserAnswer.subscribe(function () { return answerChangedCallback(_this); });
        }
        return Question;
    })();
    return Question;
});
//# sourceMappingURL=Question.js.map