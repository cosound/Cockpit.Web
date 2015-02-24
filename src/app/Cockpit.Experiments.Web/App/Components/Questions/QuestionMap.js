define(["require", "exports"], function (require, exports) {
    var _unsupported = "Unsupported";
    var _map;
    function Get(key) {
        var map = _map[key];
        return map != null ? map : _map[_unsupported];
    }
    exports.Get = Get;
    function Initialize() {
        _map = {
            "Monitor:Event:StartAtDateTime": new QuestionMap("Questions/Start", false),
            "Monitor:Event:EndAtDateTime": new QuestionMap("Questions/End", false),
            "Monitor": new QuestionMap("Questions/Monitor", false),
            "introductions_r001": new QuestionMap("Questions/Introduction"),
            "BooleanQuestion, 1.0": new QuestionMap("Questions/Boolean"),
            "AbQuestion, 1.0": new QuestionMap("Questions/AB"),
            "RadioButtonGroup": new QuestionMap("Questions/RadioButtonGroup"),
            "Freetext": new QuestionMap("Questions/Freetext"),
            "ContinousScale": new QuestionMap("Questions/ContinousScale"),
            "DropDown": new QuestionMap("Questions/ContinousScale2D"),
        };
        _map[_unsupported] = new QuestionMap("Questions/Unsupported", false);
    }
    var QuestionMap = (function () {
        function QuestionMap(type, hasUIElement) {
            if (hasUIElement === void 0) { hasUIElement = true; }
            this.Type = type;
            this.HasUIElement = hasUIElement;
        }
        return QuestionMap;
    })();
    exports.QuestionMap = QuestionMap;
    Initialize();
});
//# sourceMappingURL=QuestionMap.js.map