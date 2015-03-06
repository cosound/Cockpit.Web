var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout", "jquery", "Highcharts", "HighchartsMore", "Components/Questions/QuestionBase"], function (require, exports, knockout, jquery, Highcharts, HighchartsMore, QuestionBase) {
    Highcharts;
    HighchartsMore;
    var TwoDScaleK = (function (_super) {
        __extends(TwoDScaleK, _super);
        function TwoDScaleK(question) {
            _super.call(this, question);
            this.ChartElement = knockout.observable();
            this._subscriptions = [];
            this._subscriptions.push(this.ChartElement.subscribe(this.InitializeChart, this));
        }
        TwoDScaleK.prototype.InitializeChart = function () {
            jquery(this.ChartElement()).highcharts({
                chart: {
                    type: 'bubble'
                },
                title: {
                    text: this.GetInstrument("HeaderLabel")
                },
                xAxis: {
                    title: this.GetInstrument("X1AxisLabel"),
                    min: -1,
                    max: 1
                },
                yAxis: {
                    title: this.GetInstrument("Y1AxisLabel"),
                    min: -1,
                    max: 1
                },
                series: this.GetInstrument("Items").Item.forEach(function (v) {
                    return { name: v.List, data: [0, 0, 5] };
                })
            });
        };
        TwoDScaleK.prototype.dispose = function () {
            this.ChartElement(null);
            for (var i = 0; i < this._subscriptions.length; i++)
                this._subscriptions[i].dispose();
        };
        return TwoDScaleK;
    })(QuestionBase);
    return TwoDScaleK;
});
//# sourceMappingURL=TwoDScaleK.js.map