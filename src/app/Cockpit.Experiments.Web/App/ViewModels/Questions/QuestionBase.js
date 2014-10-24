define(["require", "exports"], function(require, exports) {
    var QuestionsBase = (function () {
        function QuestionsBase(questionData) {
            this._slideData = questionData;
            this.Data = questionData.Data;

            this.Initialize();
        }
        QuestionsBase.prototype.Initialize = function () {
            throw new Error("Not implemented");
        };
        return QuestionsBase;
    })();

    
    return QuestionsBase;
});
//# sourceMappingURL=QuestionBase.js.map
