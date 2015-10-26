define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var isDefault = true;
    var _defaultName = "Cockpit";
    function ToDefault(subName) {
        if (subName === void 0) { subName = null; }
        exports.Title((subName == null ? "" : subName + " - ") + _defaultName);
        isDefault = true;
    }
    exports.ToDefault = ToDefault;
    function Initialize() {
        exports.Title = knockout.observable(_defaultName);
        exports.Title.subscribe(function (v) {
            document.title = v;
            isDefault = false;
        });
    }
    Initialize();
});
