define(["require", "exports", "Managers/Notification"], function (require, exports, Notification) {
    var CallRepeater = (function () {
        function CallRepeater(caller, callback) {
            this._repeatWaitPeriod = 500;
            this._callback = callback;
            this._caller = caller;
        }
        CallRepeater.prototype.Call = function (completedCallback) {
            var _this = this;
            if (completedCallback == null)
                throw new Error("completedCallback must not be null");
            if (this._completedCallback != null)
                throw new Error("Call already invoked");
            this._completedCallback = completedCallback;
            this._caller(function (s, f) { return _this.CallCompleted(s, f); });
        };
        CallRepeater.prototype.Complete = function (success, invokeCompleted) {
            if (invokeCompleted === void 0) { invokeCompleted = true; }
            if (invokeCompleted)
                this._completedCallback(success);
            this._callback(success);
        };
        CallRepeater.prototype.CallCompleted = function (success, fatal) {
            var _this = this;
            if (success)
                this.Complete(true);
            else if (fatal)
                this.Complete(false);
            else {
                Notification.Debug("Call failed, repeating in " + this._repeatWaitPeriod + " milliseconds");
                setTimeout(function () { return _this._caller(function (s, f) { return _this.CallCompleted(s, f); }); }, this._repeatWaitPeriod);
                this._repeatWaitPeriod *= 2;
            }
        };
        return CallRepeater;
    })();
    return CallRepeater;
});
