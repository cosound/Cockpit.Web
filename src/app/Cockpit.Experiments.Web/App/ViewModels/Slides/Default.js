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

            for (var i = 0; i < this.Questions.length; i++) {
                if (this.Questions[i].UserInput() == null) {
                    allQuestionsAnswered = false;
                    break;
                }
            }

            this._slideData.CanGoToNextSlide(allQuestionsAnswered);
        };
        return Default;
    })();

    
    return Default;
});
//# sourceMappingURL=Default.js.map
