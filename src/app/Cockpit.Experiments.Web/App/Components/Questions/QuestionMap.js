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
            "Monitor": new QuestionMap("Questions/Monitor", false),
            "Header": new QuestionMap("Questions/Header", false),
            "EndOfExperiment": new QuestionMap("Questions/EndOfExperiment", false),
            "introductions_r001": new QuestionMap("Questions/Introduction"),
            "BooleanQuestion, 1.0": new QuestionMap("Questions/Boolean"),
            "AbQuestion, 1.0": new QuestionMap("Questions/AB"),
            "RadioButtonGroup": new QuestionMap("Questions/RadioButtonGroup"),
            "CheckBoxGroup": new QuestionMap("Questions/CheckBoxGroup"),
            "Freetext": new QuestionMap("Questions/Freetext"),
            "FreetextHash": new QuestionMap("Questions/FreetextHash"),
            "OneDScale": new QuestionMap("Questions/OneDScale"),
            "TwoDScale": new QuestionMap("Questions/ContinousScale2D"),
            "TwoDKScaleDD": new QuestionMap("Questions/TwoDScaleK"),
            "TextBlock": new QuestionMap("Questions/TextBlock"),
            "LikertScale": new QuestionMap("Questions/LikertScale"),
            "KacPS": new QuestionMap("Questions/KAcPS")
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
