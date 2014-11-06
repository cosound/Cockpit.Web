define(["require", "exports", "Models/Question", "ExperimentManager"], function(require, exports, QuestionModel, ExperimentManager) {
    var Default = (function () {
        function Default(slide) {
            var _this = this;
            this._uiLessQuestions = [];
            this.Questions = [];
            this._slide = slide;

            for (var i = 0; i < slide.Questions.length; i++) {
                var questionModel = new QuestionModel(slide.Questions[i], function (question) {
                    return _this.AnswerChanged(question);
                });
                this.Questions.push(questionModel);

                if (!questionModel.HasUIElement) {
                    require(["ViewModels/" + questionModel.Type], function (vm) {
                        _this._uiLessQuestions.push(new vm(questionModel));
                    });
                }
            }
        }
        Default.prototype.AnswerChanged = function (question) {
            ExperimentManager.SaveQuestionAnswer(question.Id, question.UserAnswer());

            var allQuestionsAnswered = true;

            for (var i = 0; i < this.Questions.length; i++) {
                if (this.Questions[i].HasInput && this.Questions[i].UserAnswer() == null)
                    allQuestionsAnswered = false;
            }

            this._slide.CanGoToNextSlide(allQuestionsAnswered);
        };
        return Default;
    })();

    
    return Default;
});
//# sourceMappingURL=Default.js.map
