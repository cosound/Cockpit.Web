define(["require", "exports", "Models/Question", "Managers/Experiment", "Components/NameConventionLoader"], function (require, exports, QuestionModel, ExperimentManager, NameConventionLoader) {
    var Default = (function () {
        function Default(slide) {
            var _this = this;
            this._uiLessQuestions = [];
            this.Questions = [];
            this._slide = slide;
            slide.SlideCompleted = function () { return _this.SlideCompleted(); };
            this.InitializeQuestions(slide.Questions);
        }
        Default.prototype.InitializeQuestions = function (questions) {
            var _this = this;
            var isFinished = false;
            var numberToLoad = 0;
            var uiLessLoader = function (model) {
                numberToLoad++;
                require([NameConventionLoader.GetFilePath(model.Type)], function (vm) {
                    _this._uiLessQuestions.push(new vm(model));
                    if (isFinished && --numberToLoad == 0)
                        _this.SlideLoaded();
                });
            };
            for (var i = 0; i < questions.length; i++) {
                var questionModel = new QuestionModel(questions[i], function (question) { return _this.AnswerChanged(question); });
                this.Questions.push(questionModel);
                if (!questionModel.HasUIElement)
                    uiLessLoader(questionModel);
            }
            if (numberToLoad == 0)
                this.SlideLoaded();
            else
                isFinished = true;
        };
        Default.prototype.SlideLoaded = function () {
            for (var i = 0; i < this._uiLessQuestions.length; i++)
                this._uiLessQuestions[i].SlideLoaded();
            this.CheckIfAllQuestionsAreAnswered();
        };
        Default.prototype.SlideCompleted = function () {
            for (var i = 0; i < this._uiLessQuestions.length; i++)
                this._uiLessQuestions[i].SlideCompleted();
        };
        Default.prototype.AnswerChanged = function (question) {
            ExperimentManager.SaveQuestionAnswer(question.Id, question.Answer());
            this.CheckIfAllQuestionsAreAnswered();
        };
        Default.prototype.CheckIfAllQuestionsAreAnswered = function () {
            var allQuestionsAnswered = true;
            for (var i = 0; i < this.Questions.length; i++) {
                if (this.Questions[i].RequiresInput && this.Questions[i].Answer() == null)
                    allQuestionsAnswered = false;
            }
            this._slide.CanGoToNextSlide(allQuestionsAnswered);
        };
        return Default;
    })();
    return Default;
});
//# sourceMappingURL=Default.js.map