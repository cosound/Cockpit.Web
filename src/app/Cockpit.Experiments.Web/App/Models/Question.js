define(["require", "exports", "knockout", "Components/Questions/QuestionMap"], function (require, exports, knockout, QuestionMap) {
    var Question = (function () {
        function Question(question, answerChangedCallback, questionLoadedCallback) {
            var _this = this;
            this.Answer = knockout.observable();
            this.HasValidAnswer = knockout.observable(false);
            this.ScrollToCallback = knockout.observable(null);
            var questionMap = QuestionMap.Get(question.Type);
            this.Id = question.Id;
            this.Type = questionMap.Type;
            this.HasUIElement = questionMap.HasUIElement;
            this.APIType = question.Type;
            this._loadedCallback = questionLoadedCallback;
            if (question.Output)
                this.Answer(question.Output);
            this.Input = question.Input;
            this.Answer.extend({ rateLimit: { timeout: 200, method: "notifyWhenChangesStop" } });
            this.Answer.subscribe(function () { return answerChangedCallback(_this); });
        }
        Question.prototype.Loaded = function () {
            if (this._loadedCallback === null)
                return;
            this._loadedCallback();
            this._loadedCallback = null;
        };
        Question.prototype.ScrollTo = function (duration) {
            if (this.ScrollToCallback() == null)
                throw new Error("SrollTo not ready");
            this.ScrollToCallback()(duration);
        };
        return Question;
    })();
    return Question;
});
