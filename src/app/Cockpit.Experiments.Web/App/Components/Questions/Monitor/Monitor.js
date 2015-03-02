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
        Monitor.prototype.SlideCompleted = function () {
            this.SetAnswer({ Events: [this.CreateEvent(new Date(), "Slide Completed")], Contexts: [] });
        };
        Monitor.prototype.CreateEvent = function (dateTime, type) {
            return { DateTime: dateTime, Type: type, Id: " ", Data: " ", Method: " " };
        };
        return Monitor;
    })(QuestionBase);
    return Monitor;
});
//# sourceMappingURL=Monitor.js.map