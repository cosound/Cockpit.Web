define(["require", "exports", "Models/Question", "Managers/Experiment", "Components/NameConventionLoader"], function (require, exports, QuestionModel, ExperimentManager, NameConventionLoader) {
    var Default = (function () {
        function Default(slide) {
            var _this = this;
            this._uiLessQuestions = [];
            this.Questions = [];
            this._slide = slide;
            slide.SlideCompleted = function (callback) { return _this.SlideCompleted(callback); };
            this.InitializeQuestions(slide.Questions);
        }
        Default.prototype.InitializeQuestions = function (questions) {
            var _this = this;
            var numberToLoad = questions.length;
            var loaded = function () {
                if (--numberToLoad === 0)
                    _this.SlideLoaded();
            };
            for (var i = 0; i < questions.length; i++) {
                var questionModel = new QuestionModel(questions[i], function (question) { return _this.AnswerChanged(question); }, loaded);
                questionModel.HasValidAnswer.subscribe(function () { return _this.CheckIfAllQuestionsAreAnswered(); });
                this.Questions.push(questionModel);
                if (!questionModel.HasUIElement)
                    require([NameConventionLoader.GetFilePath(questionModel.Type)], function (vm) { return _this._uiLessQuestions.push(new vm(questionModel)); });
            }
            if (questions.length === 0)
                this.SlideLoaded();
        };
        Default.prototype.SlideLoaded = function () {
            for (var i = 0; i < this._uiLessQuestions.length; i++)
                this._uiLessQuestions[i].SlideLoaded();
            this.CheckIfAllQuestionsAreAnswered();
        };
        Default.prototype.SlideCompleted = function (completed) {
            var calls = this._uiLessQuestions.length;
            for (var i = 0; i < this._uiLessQuestions.length; i++) {
                this._uiLessQuestions[i].SlideCompleted(function () {
                    if (--calls === 0)
                        completed();
                });
            }
        };
        Default.prototype.AnswerChanged = function (question) {
            if (question.HasValidAnswer())
                ExperimentManager.SaveQuestionAnswer(question.Id, question.Answer());
            this.CheckIfAllQuestionsAreAnswered();
        };
        Default.prototype.CheckIfAllQuestionsAreAnswered = function () {
            var allQuestionsAnswered = true;
            for (var i = 0; i < this.Questions.length; i++) {
                if (this.Questions[i].RequiresInput && !this.Questions[i].HasValidAnswer())
                    allQuestionsAnswered = false;
            }
            this._slide.CanGoToNextSlide(allQuestionsAnswered);
        };
        return Default;
    })();
    return Default;
});
