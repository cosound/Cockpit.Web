define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var TwoDScaleK = (function () {
        function TwoDScaleK() {
            var _this = this;
            this.Context = knockout.observable();
            this.Width = knockout.observable();
            this.Height = knockout.observable();
            this.XMinLabel = "Cheap";
            this.XMaxLabel = "Expensive";
            this.YMinLabel = "Cool";
            this.YMaxLabel = "Uncool";
            this._subscriptions = [];
            this._subscriptions.push(this.Context.subscribe(function () { return _this.Update(); }));
            this._subscriptions.push(this.Width.subscribe(function () { return _this.Update(); }));
            this._subscriptions.push(this.Height.subscribe(function () { return _this.Update(); }));
        }
        TwoDScaleK.prototype.SetPosition = function (x, y) {
            var context = this.Context();
            context.clearRect(0, 0, this.Width(), this.Height());
            this.DrawBackground();
            context.beginPath();
            context.arc(x, y, 5, 0, Math.PI * 2, false);
            context.closePath();
            context.strokeStyle = TwoDScaleK.PositionStrokeColor;
            context.stroke();
            context.fillStyle = TwoDScaleK.PositionFillColor;
            context.fill();
        };
        TwoDScaleK.prototype.Update = function () {
            if (this.Context() == null || this.Width() == null || this.Height() == null)
                return;
            this.DrawBackground();
        };
        TwoDScaleK.prototype.DrawBackground = function () {
            this.DrawGrid();
            this.DrawAxis();
            this.DrawLabels();
            this.DrawBorder();
        };
        TwoDScaleK.prototype.DrawGrid = function () {
            var context = this.Context();
            var width = this.Width();
            var height = this.Height();
            context.beginPath();
            for (var x = 0.5; x < width; x += TwoDScaleK.BackgroundLineSpacing) {
                context.moveTo(x, 0);
                context.lineTo(x, height);
            }
            for (var y = 0.5; y < height; y += TwoDScaleK.BackgroundLineSpacing) {
                context.moveTo(0, y);
                context.lineTo(width, y);
            }
            context.strokeStyle = TwoDScaleK.BackgroundStrokeColor;
            context.stroke();
        };
        TwoDScaleK.prototype.DrawAxis = function () {
            var context = this.Context();
            var width = this.Width();
            var height = this.Height();
            context.beginPath();
            context.moveTo(0, height / 2);
            context.lineTo(width, height / 2);
            context.moveTo(width / 2, 0);
            context.lineTo(width / 2, height);
            context.strokeStyle = TwoDScaleK.AxisStrokeColor;
            context.stroke();
        };
        TwoDScaleK.prototype.DrawLabels = function () {
            var context = this.Context();
            var width = this.Width();
            var height = this.Height();
            context.fillStyle = TwoDScaleK.LabelColor;
            context.textAlign = "left";
            context.textBaseline = "bottom";
            context.fillText(this.XMinLabel, TwoDScaleK.LabelMargin, height / 2 - TwoDScaleK.LabelMargin);
            context.textAlign = "right";
            context.fillText(this.XMaxLabel, width - TwoDScaleK.LabelMargin, height / 2 - TwoDScaleK.LabelMargin);
            context.textAlign = "left";
            context.textBaseline = "top";
            context.fillText(this.YMinLabel, width / 2 + TwoDScaleK.LabelMargin, TwoDScaleK.LabelMargin);
            context.textBaseline = "bottom";
            context.fillText(this.YMaxLabel, width / 2 + TwoDScaleK.LabelMargin, height - TwoDScaleK.LabelMargin);
        };
        TwoDScaleK.prototype.DrawBorder = function () {
            var context = this.Context();
            var width = this.Width();
            var height = this.Height();
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(width, 0);
            context.lineTo(width, height);
            context.lineTo(0, height);
            context.closePath();
            context.strokeStyle = TwoDScaleK.BorderStrokeColor;
            context.stroke();
        };
        TwoDScaleK.prototype.dispose = function () {
            for (var i = 0; i < this._subscriptions.length; i++)
                this._subscriptions[i].dispose();
        };
        TwoDScaleK.BackgroundStrokeColor = "#eee";
        TwoDScaleK.BackgroundLineSpacing = 10;
        TwoDScaleK.BorderStrokeColor = "#000";
        TwoDScaleK.AxisStrokeColor = "#000";
        TwoDScaleK.PositionStrokeColor = "#000";
        TwoDScaleK.PositionFillColor = "#999";
        TwoDScaleK.LabelColor = "#000";
        TwoDScaleK.LabelMargin = 5;
        return TwoDScaleK;
    })();
    return TwoDScaleK;
});
//# sourceMappingURL=TwoDScaleK.js.map