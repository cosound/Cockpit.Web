define(["require", "exports"], function (require, exports) {
    var CallQueue = (function () {
        function CallQueue(onlyCallLast) {
            this._queues = {};
            this._onlyCallLast = onlyCallLast;
        }
        CallQueue.prototype.Queue = function (id, call) {
            var _this = this;
            if (this._queues.hasOwnProperty(id)) {
                this._queues[id].push(call);
            }
            else {
                this._queues[id] = [call];
                call.Call(function (s) { return _this.CallNext(id, 1, s); });
            }
        };
        CallQueue.prototype.CallNext = function (id, count, success) {
            var _this = this;
            var queue = this._queues[id];
            if (queue.length === 1) {
                delete this._queues[id];
                return;
            }
            var completed = queue.splice(0, count);
            completed.pop();
            completed.forEach(function (c) { return c.Complete(success, false); });
            if (queue.length === 0)
                delete this._queues[id];
            else {
                var newCount = queue.length;
                queue[newCount - 1].Call(function (s) { return _this.CallNext(id, newCount, s); });
            }
        };
        return CallQueue;
    })();
    return CallQueue;
});
