var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Components/Questions/QuestionBase"], function (require, exports, QuestionBase) {
    var Monitor = (function (_super) {
        __extends(Monitor, _super);
        function Monitor(question) {
            _super.call(this, question, false);
        }
        Monitor.prototype.SlideLoaded = function () {
            this.AddEvent("Start", "/", "Monitor");
            this.UpdateAnswer();
        };
        Monitor.prototype.SlideCompleted = function () {
            this.AddEvent("Stop", "/", "Monitor");
            this.UpdateAnswer();
            return true;
        };
        Monitor.prototype.UpdateAnswer = function () {
            this.SetAnswer({ Context: { Type: "UserAgent", Data: navigator.userAgent }, TimeZone: { Offset: new Date().getTimezoneOffset() } });
        };
        return Monitor;
    })(QuestionBase);
    return Monitor;
});
