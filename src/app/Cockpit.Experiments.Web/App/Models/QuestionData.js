define(["require", "exports"], function(require, exports) {
    var QuestionData = (function () {
        function QuestionData(data) {
            if (typeof data === "undefined") { data = null; }
            this.Name = "Questions/" + data.Fullname.substr(0, data.Fullname.indexOf("Question"));
            this.Data = data;
        }
        return QuestionData;
    })();

    
    return QuestionData;
});
//# sourceMappingURL=QuestionData.js.map
