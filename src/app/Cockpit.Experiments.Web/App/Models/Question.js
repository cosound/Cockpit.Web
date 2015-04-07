define(["require", "exports", "knockout", "Components/Questions/QuestionMap"], function (require, exports, knockout, QuestionMap) {
    var Question = (function () {
        function Question(question, answerChangedCallback) {
            var _this = this;
            this.Answer = knockout.observable();
            this.HasValidAnswer = knockout.observable(false);
            var questionMap = QuestionMap.Get(question.Type);
            this.Id = question.Id;
            this.Type = questionMap.Type;
            this.HasUIElement = questionMap.HasUIElement;
            this.APIType = question.Type;
            if (question.Output)
                this.Answer(question.Output);
            this.Input = question.Input;
            this.Answer.extend({ rateLimit: { timeout: 200, method: "notifyWhenChangesStop" } });
            this.Answer.subscribe(function () { return answerChangedCallback(_this); });
        }
        return Question;
    })();
    return Question;
});
