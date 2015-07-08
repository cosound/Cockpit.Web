define(["require", "exports"], function (require, exports) {
    var CallQueue = (function () {
        function CallQueue() {
            this._queues = {};
        }
        CallQueue.prototype.Queue = function (id, call) {
            var _this = this;
            if (this._queues.hasOwnProperty(id)) {
                this._queues[id].push(call);
            }
            else {
                this._queues[id] = [call];
                call.Call(function () { return _this.CallNext(id); });
            }
        };
        CallQueue.prototype.CallNext = function (id) {
            var _this = this;
            var queue = this._queues[id];
            queue.shift();
            if (queue.length === 0)
                delete this._queues[id];
            else
                queue[0].Call(function () { return _this.CallNext(id); });
        };
        return CallQueue;
    })();
    return CallQueue;
});
