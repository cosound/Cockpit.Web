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
            var _this = this;
            _super.call(this, question);
            this.ChartElement = knockout.observable();
            this.Items = knockout.observableArray();
            this._subscriptions = [];
            this.Title = this.GetInstrument("HeaderLabel");
            this.Items = knockout.observableArray(this.GetInstrument("Items").Item.map(function (i) { return _this.CreateItem(i); }));
            this._subscriptions.push(this.ChartElement.subscribe(this.InitializeChart, this));
        }
        TwoDScaleK.prototype.InitializeChart = function () {
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
                                update: function (e) {
                                    console.log(e);
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
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: 'black'
                    }],
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
                    plotLines: [{
                        value: 0,
                        width: 2,
                        color: 'black'
                    }],
                    labels: { enabled: false }
                },
                tooltip: false
            });
            this._chart = jquery(this.ChartElement()).highcharts();
        };
        TwoDScaleK.prototype.CreateItem = function (data) {
            var _this = this;
            var isAdded = false;
            var audioInfo = new AudioInfo([{ Type: data.Stimulus.Type, Source: data.Stimulus.URI }]);
            var item = {
                Id: data.Id,
                Name: data.List.Label,
                AudioInfo: audioInfo,
                GraphData: this.CreateGraphItem(data)
            };
            audioInfo.AddIsPlayingCallback(function (isPlaying) {
                _this.AddEvent(isPlaying ? "Start" : "Stop", data.Id);
                if (isPlaying && !isAdded) {
                    isAdded = true;
                    _this._chart.addSeries(item.GraphData);
                }
            });
            return item;
        };
        TwoDScaleK.prototype.CreateGraphItem = function (data) {
            return {
                name: data.List.Label,
                draggableX: true,
                draggableY: true,
                cursor: 'pointer',
                data: [[0, 0]]
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