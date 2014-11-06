define(["require", "exports"], function(require, exports) {
    var QuestionMap = (function () {
        function QuestionMap(type, hasUIElement) {
            if (typeof hasUIElement === "undefined") { hasUIElement = true; }
            this.Type = type;
            this.HasUIElement = hasUIElement;
        }
        return QuestionMap;
    })();
    exports.QuestionMap = QuestionMap;

    exports.Map = {
        "Monitor:Event:StartAtDateTime": new QuestionMap("Questions/Start", false),
        "Monitor:Event:EndAtDateTime": new QuestionMap("Questions/End", false),
        "introductions_r001": new QuestionMap("Questions/Introduction"),
        "BooleanQuestion, 1.0": new QuestionMap("Questions/Boolean"),
        "AbQuestion, 1.0": new QuestionMap("Questions/AB")
    };
});
//# sourceMappingURL=QuestionMap.js.map
