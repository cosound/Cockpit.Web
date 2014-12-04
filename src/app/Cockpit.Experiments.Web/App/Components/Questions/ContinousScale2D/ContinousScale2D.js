define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var ContinousScale2D = (function () {
        function ContinousScale2D() {
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
        ContinousScale2D.prototype.SetPosition = function (x, y) {
            var context = this.Context();
            context.clearRect(0, 0, this.Width(), this.Height());
            this.DrawBackground();
            context.beginPath();
            context.arc(x, y, 5, 0, Math.PI * 2, false);
            context.closePath();
            context.strokeStyle = ContinousScale2D.PositionStrokeColor;
            context.stroke();
            context.fillStyle = ContinousScale2D.PositionFillColor;
            context.fill();
        };
        ContinousScale2D.prototype.Update = function () {
            if (this.Context() == null || this.Width() == null || this.Height() == null)
                return;
            this.DrawBackground();
        };
        ContinousScale2D.prototype.DrawBackground = function () {
            this.DrawGrid();
            this.DrawAxis();
            this.DrawLabels();
            this.DrawBorder();
        };
        ContinousScale2D.prototype.DrawGrid = function () {
            var context = this.Context();
            var width = this.Width();
            var height = this.Height();
            context.beginPath();
            for (var x = 0.5; x < width; x += ContinousScale2D.BackgroundLineSpacing) {
                context.moveTo(x, 0);
                context.lineTo(x, height);
            }
            for (var y = 0.5; y < height; y += ContinousScale2D.BackgroundLineSpacing) {
                context.moveTo(0, y);
                context.lineTo(width, y);
            }
            context.strokeStyle = ContinousScale2D.BackgroundStrokeColor;
            context.stroke();
        };
        ContinousScale2D.prototype.DrawAxis = function () {
            var context = this.Context();
            var width = this.Width();
            var height = this.Height();
            context.beginPath();
            context.moveTo(0, height / 2);
            context.lineTo(width, height / 2);
            context.moveTo(width / 2, 0);
            context.lineTo(width / 2, height);
            context.strokeStyle = ContinousScale2D.AxisStrokeColor;
            context.stroke();
        };
        ContinousScale2D.prototype.DrawLabels = function () {
            var context = this.Context();
            var width = this.Width();
            var height = this.Height();
            context.fillStyle = ContinousScale2D.LabelColor;
            context.textAlign = "left";
            context.textBaseline = "bottom";
            context.fillText(this.XMinLabel, ContinousScale2D.LabelMargin, height / 2 - ContinousScale2D.LabelMargin);
            context.textAlign = "right";
            context.fillText(this.XMaxLabel, width - ContinousScale2D.LabelMargin, height / 2 - ContinousScale2D.LabelMargin);
            context.textAlign = "left";
            context.textBaseline = "top";
            context.fillText(this.YMinLabel, width / 2 + ContinousScale2D.LabelMargin, ContinousScale2D.LabelMargin);
            context.textBaseline = "bottom";
            context.fillText(this.YMaxLabel, width / 2 + ContinousScale2D.LabelMargin, height - ContinousScale2D.LabelMargin);
        };
        ContinousScale2D.prototype.DrawBorder = function () {
            var context = this.Context();
            var width = this.Width();
            var height = this.Height();
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(width, 0);
            context.lineTo(width, height);
            context.lineTo(0, height);
            context.closePath();
            context.strokeStyle = ContinousScale2D.BorderStrokeColor;
            context.stroke();
        };
        ContinousScale2D.prototype.dispose = function () {
            for (var i = 0; i < this._subscriptions.length; i++)
                this._subscriptions[i].dispose();
        };
        ContinousScale2D.BackgroundStrokeColor = "#eee";
        ContinousScale2D.BackgroundLineSpacing = 10;
        ContinousScale2D.BorderStrokeColor = "#000";
        ContinousScale2D.AxisStrokeColor = "#000";
        ContinousScale2D.PositionStrokeColor = "#000";
        ContinousScale2D.PositionFillColor = "#999";
        ContinousScale2D.LabelColor = "#000";
        ContinousScale2D.LabelMargin = 5;
        return ContinousScale2D;
    })();
    return ContinousScale2D;
});
//# sourceMappingURL=ContinousScale2D.js.map