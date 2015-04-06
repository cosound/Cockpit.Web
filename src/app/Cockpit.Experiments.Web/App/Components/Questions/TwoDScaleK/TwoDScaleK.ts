import knockout = require("knockout");
import jquery = require("jquery");
import Highcharts = require("Highcharts"); Highcharts;
import HighchartsMore = require("HighchartsMore"); HighchartsMore;
import HighChartsDraggablePoints = require("HighChartsDraggablePoints"); HighChartsDraggablePoints;
//import HighChartsCrossingSpecificValue = require("HighChartsCrossingSpecificValue"); HighChartsCrossingSpecificValue;
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type Item = { Id: string; Name: string; AudioInfo: AudioInfo; GraphData:any;};

class TwoDScaleK extends QuestionBase
{
	public Title:string;
	public ChartElement: KnockoutObservable<HTMLElement> = knockout.observable<HTMLElement>();
	public Items: KnockoutObservableArray<Item> = knockout.observableArray<Item>();

	private _subscriptions: KnockoutSubscription[] = [];
	private _chart:HighchartsChartObject;
	

	constructor(question: QuestionModel)
	{
		super(question);

		this.Title = this.GetInstrument("HeaderLabel");
		this.Items = knockout.observableArray((<any[]>this.GetInstrument("Items").Item).map(i => this.CreateItem(i)));

		this._subscriptions.push(this.ChartElement.subscribe(this.InitializeChart, this));
	}

	private InitializeChart():void
	{
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
							update: e =>
							{
								console.log(e)
								return true;
							}
						}
					}
				}
			},
			xAxis: {
				title: { text: this.GetInstrument("X1AxisLabel")},
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
				labels: {enabled: false}
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
	}

	private CreateItem(data:any):Item
	{
		var isAdded = false;
		var audioInfo = new AudioInfo([{ Type: data.Stimulus.Type, Source: data.Stimulus.URI }]);
		var item = {
			Id: data.Id,
			Name: data.List.Label,
			AudioInfo: audioInfo,
			GraphData: this.CreateGraphItem(data)
		}

		audioInfo.AddIsPlayingCallback(isPlaying =>
		{
			this.AddEvent(isPlaying ? "Start" : "Stop", data.Id);

			if (isPlaying && !isAdded)
			{
				isAdded = true;

				this._chart.addSeries(item.GraphData);
			}
		});

		return item;
	}

	private CreateGraphItem(data:any):HighchartsSeriesOptions
	{
		return {
			name: data.List.Label,
			draggableX: true,
			draggableY: true,
			cursor: 'pointer',
			data: [[0, 0]]
		};
	}

	public dispose():void
	{
		this.ChartElement(null);

		for (var i = 0; i < this._subscriptions.length; i++)
			this._subscriptions[i].dispose();
	}
}

export = TwoDScaleK;