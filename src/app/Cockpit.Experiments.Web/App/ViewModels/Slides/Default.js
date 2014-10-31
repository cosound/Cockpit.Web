define(["require", "exports", "Models/Question", "ExperimentManager"], function(require, exports, QuestionModel, ExperimentManager) {
    var Default = (function () {
        function Default(slide) {
            var _this = this;
            this.Questions = [];
            this._slide = slide;

            for (var i = 0; i < slide.Questions.length; i++)
                this.Questions.push(new QuestionModel(slide.Questions[i], function (question) {
                    return _this.AnswerChanged(question);
                }));
        }
        Default.prototype.AnswerChanged = function (question) {
            ExperimentManager.SaveQuestionAnswer(question.Id, question.UserAnswer());

            var allQuestionsAnswered = true;

            for (var i = 0; i < this.Questions.length; i++) {
                if (this.Questions[i].UserAnswer() == null)
                    allQuestionsAnswered = false;
            }

            this._slide.CanGoToNextSlide(allQuestionsAnswered);
        };
        return Default;
    })();

    
    return Default;
});
//# sourceMappingURL=Default.js.map
