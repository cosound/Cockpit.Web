define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var ContinousScale2D = (function () {
        function ContinousScale2D() {
            var _this = this;
            this.Context = knockout.observable();
            this._contextSubscription = this.Context.subscribe(function (v) { return _this.ContextChanged(v); });
        }
        ContinousScale2D.prototype.ContextChanged = function (context) {
            this._context = context;
            this.DrawGrid();
        };
        ContinousScale2D.prototype.SetPosition = function (x, y) {
            this._context.clearRect(0, 0, 300, 300);
            this.DrawGrid();
            this._context.beginPath();
            this._context.arc(x, y, 5, 0, Math.PI * 2, false);
            this._context.closePath();
            this._context.strokeStyle = "#000";
            this._context.stroke();
            this._context.fillStyle = "#999";
            this._context.fill();
        };
        ContinousScale2D.prototype.DrawGrid = function () {
            for (var x = 0.5; x < 300; x += 10) {
                this._context.moveTo(x, 0);
                this._context.lineTo(x, 300);
            }
            for (var y = 0.5; y < 300; y += 10) {
                this._context.moveTo(0, y);
                this._context.lineTo(300, y);
            }
            this._context.strokeStyle = "#eee";
            this._context.stroke();
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