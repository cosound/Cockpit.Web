define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var QuestionData = (function () {
        function QuestionData(data, answerChangedCallback) {
            this.UserInput = knockout.observable();
            this.Name = "Questions/" + data.Fullname.substr(0, data.Fullname.indexOf("Question"));
            this.Data = data;

            this.UserInput.subscribe(function (v) {
                return answerChangedCallback();
            });
        }
        return QuestionData;
    })();

    
    return QuestionData;
});
//# sourceMappingURL=QuestionData.js.map
