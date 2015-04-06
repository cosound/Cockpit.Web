var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Components/Questions/QuestionBase"], function (require, exports, QuestionBase) {
    var Monitor = (function (_super) {
        __extends(Monitor, _super);
        function Monitor(question) {
            _super.call(this, question, false);
        }
        Monitor.prototype.SlideLoaded = function () {
            this.AddEvent("Trial Start");
            this.SetAnswer({ Contexts: [] });
        };
        Monitor.prototype.SlideCompleted = function () {
            this.AddEvent("Trial End");
            this.SetAnswer({ Contexts: [] });
        };
        return Monitor;
    })(QuestionBase);
    return Monitor;
});
