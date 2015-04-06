var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "knockout", "jquery", "Highcharts", "HighchartsMore", "HighChartsDraggablePoints", "Components/Questions/QuestionBase", "Components/Players/Audio/AudioInfo"], function (require, exports, knockout, jquery, Highcharts, HighchartsMore, HighChartsDraggablePoints, QuestionBase, AudioInfo) {
    Highcharts;
    HighchartsMore;
    HighChartsDraggablePoints;
    var TwoDScaleK = (function (_super) {
        __extends(TwoDScaleK, _super);
        function TwoDScaleK(question) {
            _super.call(this, question);
            this.ChartElement = knockout.observable();
            this._subscriptions = [];
            this.Title = this.GetInstrument("HeaderLabel");
            this.InitializeItems();
            this._subscriptions.push(this.ChartElement.subscribe(this.InitializeChart, this));
        }
        TwoDScaleK.prototype.InitializeItems = function () {
            var _this = this;
            var answers = {};
            this.GetAsnwer().Scalings.forEach(function (scaling) {
                var coordinates = scaling.Position.split(" ");
                answers[scaling.Id] = { x: parseFloat(coordinates[0]), y: parseFloat(coordinates[1]) };
            });
            this.Items = this.GetInstrument("Items").Item.map(function (i) { return _this.CreateItem(i, answers[i.Id]); });
        };
        TwoDScaleK.prototype.InitializeChart = function () {
            var _this = this;
            jquery(this.ChartElement()).highcharts({
                chart: {
                    type: 'bubble',
                    animation: false,
                    showAxes: true,
                },
                title: {
                    text: null
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        point: {
                            events: {
                                update: function () {
                                    _this.UpdateAnswer();
                                    return true;
                                }
                            }
                        }
                    }
                },
                xAxis: {
                    title: { text: this.GetInstrument("X1AxisLabel") },
                    min: -1,
                    max: 1,
                    lineWidth: 1,
                    gridLineWidth: 1,
                    showEmpty: true,
                    tickInterval: 0.25,
                    plotLines: [
                        {
                            value: 0,
                            width: 1,
                            color: 'black'
                        }
                    ],
                    labels: { enabled: false }
                },
                yAxis: {
                    title: { text: this.GetInstrument("Y1AxisLabel") },
                    min: -1,
                    max: 1,
                    lineWidth: 1,
                    gridLineWidth: 1,
                    showEmpty: true,
                    tickInterval: 0.25,
                    plotLines: [
                        {
                            value: 0,
                            width: 2,
                            color: 'black'
                        }
                    ],
                    labels: { enabled: false }
                },
                tooltip: false,
                series: this.Items.map(function (item) { return item.GraphData; })
            });
            this._chart = jquery(this.ChartElement()).highcharts();
        };
        TwoDScaleK.prototype.UpdateAnswer = function () {
            var _this = this;
            this.SetAnswer({
                Scalings: this.Items.filter(function (i) { return i.GraphData != null; }).map(function (i) { return _this.CreateAnswerItem(i); })
            });
        };
        TwoDScaleK.prototype.CreateAnswerItem = function (item) {
            var point = item.GraphData.data[0];
            return { Id: item.Id, Position: point.x.toString() + " " + point.y.toString() };
        };
        TwoDScaleK.prototype.CreateItem = function (data, answer) {
            var _this = this;
            var audioInfo = new AudioInfo([{ Type: data.Stimulus.Type, Source: data.Stimulus.URI }]);
            var item = {
                Id: data.Id,
                Name: data.List.Label,
                AudioInfo: audioInfo,
                GraphData: answer ? this.CreateGraphItem(data, answer) : null
            };
            audioInfo.AddIsPlayingCallback(function (isPlaying) {
                _this.AddEvent(isPlaying ? "Start" : "Stop", data.Id);
                if (isPlaying && item.GraphData == null) {
                    item.GraphData = _this.CreateGraphItem(data, { x: 0, y: 0 });
                    _this._chart.addSeries(item.GraphData);
                }
            });
            return item;
        };
        TwoDScaleK.prototype.CreateGraphItem = function (data, answer) {
            return {
                name: data.List.Label,
                draggableX: true,
                draggableY: true,
                cursor: 'pointer',
                data: [answer]
            };
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