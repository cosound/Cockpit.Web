define(["require", "exports", "Managers/Notification"], function (require, exports, Notification) {
    var CallRepeater = (function () {
        function CallRepeater(caller, callback) {
            var _this = this;
            this._repeatWaitPeriod = 500;
            this._callback = callback;
            this._caller = caller;
            caller(function (s, f) { return _this.CallCompleted(s, f); });
        }
        CallRepeater.prototype.CallCompleted = function (success, fatal) {
            var _this = this;
            if (success)
                this._callback(true);
            else if (fatal)
                this._callback(false);
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
