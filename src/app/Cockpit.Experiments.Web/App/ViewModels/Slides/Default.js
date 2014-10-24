define(["require", "exports", "Models/QuestionData"], function(require, exports, QuestionData) {
    var Default = (function () {
        function Default(slideData) {
            var _this = this;
            this.Questions = [];
            this._slideData = slideData;

            for (var i = 0; i < slideData.Data.Questions.length; i++)
                this.Questions.push(new QuestionData(slideData.Data.Questions[i], function () {
                    return _this.AnswerChanged();
                }));
        }
        Default.prototype.AnswerChanged = function () {
            var allQuestionsAnswered = true;

            var data = [];

            for (var i = 0; i < this.Questions.length; i++) {
                var question = this.Questions[i];
                var answer = question.UserInput();

                if (answer == null)
                    allQuestionsAnswered = false;
                else
                    data.push(question.Data.Id + ": " + answer);
            }

            this._slideData.UserInput = data.join(", ");
            this._slideData.CanGoToNextSlide(allQuestionsAnswered);
        };
        return Default;
    })();

    
    return Default;
});
//# sourceMappingURL=Default.js.map
