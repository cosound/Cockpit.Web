define(["require", "exports", "knockout", "Models/Answer", "QuestionMap"], function(require, exports, knockout, Answer, QuestionMap) {
    var Question = (function () {
        function Question(question, answerChangedCallback) {
            var _this = this;
            this.Data = {};
            this.UserAnswer = knockout.observable();
            var questionMap = QuestionMap.Get(question.Type);

            this.Id = question.Id;
            this.Type = questionMap.Type;
            this.HasUIElement = questionMap.HasUIElement;
            this.APIType = question.Type;

            if (question.UserAnswer)
                this.UserAnswer(new Answer(question.Id, question.UserAnswer.Data));

            if (question.Data)
                this.Data = question.Data;

            this.UserAnswer.subscribe(function () {
                return answerChangedCallback(_this);
            });
        }
        return Question;
    })();

    
    return Question;
});
//# sourceMappingURL=Question.js.map
