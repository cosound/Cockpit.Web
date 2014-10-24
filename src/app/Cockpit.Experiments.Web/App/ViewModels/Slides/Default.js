define(["require", "exports", "Models/QuestionData"], function(require, exports, QuestionData) {
    var Default = (function () {
        function Default(slideData) {
            this.Questions = [];
            for (var i = 0; i < slideData.Data.Questions.length; i++)
                this.Questions.push(new QuestionData(slideData.Data.Questions[i]));
        }
        return Default;
    })();

    
    return Default;
});
//# sourceMappingURL=Default.js.map
