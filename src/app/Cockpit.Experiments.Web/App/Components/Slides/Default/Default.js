define(["require", "exports", "knockout", "Models/Question", "Managers/Experiment", "Components/NameConventionLoader"], function (require, exports, knockout, QuestionModel, ExperimentManager, NameConventionLoader) {
    var Default = (function () {
        function Default(slide) {
            var _this = this;
            this._uiLessQuestions = [];
            this._activeAnsweSets = knockout.observable(0);
            this._isWorking = knockout.observable(false);
            this.Questions = [];
            this._slide = slide;
            slide.SlideCompleted = function (callback) { return _this.SlideCompleted(callback); };
            slide.ScrollToFirstInvalidAnswerCallback = function () { return _this.ScrollToFirstInvalidAnswer(); };
            this.HaveActiveAnswersSets = knockout.computed(function () { return _this._activeAnsweSets() !== 0; });
            slide.SetIsWorking(knockout.computed(function () { return _this._isWorking() || _this.HaveActiveAnswersSets(); }));
            this.InitializeQuestions(slide.Questions);
        }
        Default.prototype.InitializeQuestions = function (questions) {
            var _this = this;
            var numberToLoad = questions.length;
            var loaded = function () { if (--numberToLoad === 0)
                _this.SlideLoaded(); };
            for (var i = 0; i < questions.length; i++) {
                var questionModel = new QuestionModel(questions[i], function (question) { return _this.AnswerChanged(question); }, loaded);
                questionModel.HasValidAnswer.subscribe(function () { return _this.CheckIfAllQuestionsAreAnswered(); });
                this.Questions.push(questionModel);
                if (!questionModel.HasUIElement)
                    (function (m) { return require([NameConventionLoader.GetFilePath(questionModel.Type)], function (vm) { return _this._uiLessQuestions.push(new vm(m)); }); })(questionModel);
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
            var waitForAnswerSaved = false;
            for (var i = 0; i < this._uiLessQuestions.length; i++) {
                waitForAnswerSaved = this._uiLessQuestions[i].SlideCompleted() || waitForAnswerSaved;
            }
            if (waitForAnswerSaved) {
                var sub = this.HaveActiveAnswersSets.subscribe(function (v) {
                    if (!v) {
                        sub.dispose();
                        completed();
                    }
                });
            }
            else
                completed();
        };
        Default.prototype.ScrollToFirstInvalidAnswer = function () {
            var question = this.GetFirstQuestionWithoutValidAnswer();
            if (question != null)
                question.ScrollTo(ExperimentManager.ScrollToInvalidAnswerDuration);
        };
        Default.prototype.AnswerChanged = function (question) {
            var _this = this;
            if (question.HasValidAnswer()) {
                this._activeAnsweSets(this._activeAnsweSets() + 1);
                ExperimentManager.SaveQuestionAnswer(question.Id, question.Answer(), function (success) {
                    if (!success)
                        question.HasValidAnswer(false);
                    _this._isWorking(true);
                    _this._activeAnsweSets(_this._activeAnsweSets() - 1);
                    _this.CheckIfAllQuestionsAreAnswered();
                    _this._isWorking(false);
                });
            }
            this.CheckIfAllQuestionsAreAnswered();
        };
        Default.prototype.GetFirstQuestionWithoutValidAnswer = function () {
            for (var i = 0; i < this.Questions.length; i++) {
                if (this.Questions[i].RequiresInput && !this.Questions[i].HasValidAnswer())
                    return this.Questions[i];
            }
            return null;
        };
        Default.prototype.CheckIfAllQuestionsAreAnswered = function () {
            this._slide.CanGoToNextSlide(this.GetFirstQuestionWithoutValidAnswer() == null && !this.HaveActiveAnswersSets());
        };
        return Default;
    })();
    return Default;
});
