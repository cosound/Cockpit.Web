define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var ContinousScale2D = (function () {
        function ContinousScale2D() {
            var _this = this;
            this.Context = knockout.observable();
            this._contextSubscription = this.Context.subscribe(function (v) { return _this.ContextChanged(v); });
        }
        ContinousScale2D.prototype.ContextChanged = function (context) {
            this._context = context;
            this._context.fillRect(10, 10, 100, 100);
        };
        ContinousScale2D.prototype.CleanContextSubscription = function () {
            if (this._contextSubscription == null)
                return;
            this._contextSubscription.dispose();
            this._contextSubscription = null;
        };
        ContinousScale2D.prototype.dispose = function () {
            this.CleanContextSubscription();
        };
        return ContinousScale2D;
    })();
    return ContinousScale2D;
});
//# sourceMappingURL=ContinousScale2D.js.map