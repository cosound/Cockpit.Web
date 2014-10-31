define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var Question = (function () {
        function Question(question, answerChangedCallback) {
            var _this = this;
            this.Data = {};
            this.UserAnswer = knockout.observable();
            var typeInfo = question.Type.split(", ");

            this.Id = question.Id;
            this.Type = typeInfo[0].substr(0, typeInfo[0].indexOf("Question"));
            this.Version = typeInfo[1];

            for (var i = 0; i < question.Data.length; i++) {
                var data = question.Data[i];
                var key = data.substring(1, data.indexOf(","));
                this.Data[key] = data.substring(key.length + 3, data.length - 1);
            }

            this.UserAnswer.subscribe(function () {
                return answerChangedCallback(_this);
            });
        }
        return Question;
    })();

    
    return Question;
});
//# sourceMappingURL=Question.js.map
