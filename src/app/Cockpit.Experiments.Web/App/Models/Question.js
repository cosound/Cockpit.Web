define(["require", "exports", "knockout", "Components/Questions/QuestionMap"], function (require, exports, knockout, QuestionMap) {
    var Question = (function () {
        function Question(question, answerChangedCallback) {
            var _this = this;
            this.Data = {};
            this.Answer = knockout.observable();
            var questionMap = QuestionMap.Get(question.Type);
            this.Id = question.Id;
            this.Type = questionMap.Type;
            this.HasUIElement = questionMap.HasUIElement;
            this.APIType = question.Type;
            if (question.Output)
                this.Answer(question.Output);
            if (question.Data)
                this.Data = question.Data;
            this.Answer.subscribe(function () { return answerChangedCallback(_this); });
        }
        return Question;
    })();
    return Question;
});
//# sourceMappingURL=Question.js.map