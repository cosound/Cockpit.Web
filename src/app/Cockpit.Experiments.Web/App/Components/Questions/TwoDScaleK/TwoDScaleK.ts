import knockout = require("knockout");
import jquery = require("jquery");
import Highcharts = require("Highcharts"); Highcharts;
import HighchartsMore = require("HighchartsMore"); HighchartsMore;
import HighChartsDraggablePoints = require("HighChartsDraggablePoints"); HighChartsDraggablePoints;
//import HighChartsCrossingSpecificValue = require("HighChartsCrossingSpecificValue"); HighChartsCrossingSpecificValue;
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type Item = { Id: string; Name: string; AudioInfo: AudioInfo; GraphData: HighchartsSeriesOptions;};
type AnswerItem = { Id: string; Position:string;};

class TwoDScaleK extends QuestionBase<{ Scalings: AnswerItem[]}>
{
	public Title:string;
	public ChartElement: KnockoutObservable<HTMLElement> = knockout.observable<HTMLElement>();
	public Items: Item[];

	private _subscriptions: KnockoutSubscription[] = [];
	private _chart:HighchartsChartObject;
	

	constructor(question: QuestionModel)
	{
		super(question);

		this.Title = this.GetInstrumentFormatted("HeaderLabel");
		this.InitializeItems();

		this._subscriptions.push(this.ChartElement.subscribe(this.InitializeChart, this));
	}

	private InitializeItems():void
	{
		var answers: {[key:string]:{x:number; y:number}} = {};

		this.GetAnswer().Scalings.forEach((scaling:AnswerItem) =>
		{
			var coordinates = scaling.Position.split(" ");
			answers[scaling.Id] = { x: parseFloat(coordinates[0]), y: parseFloat(coordinates[1]) }
		});

		this.Items = (<any[]>this.GetInstrument("Items").Item).map(i => this.CreateItem(i, answers[i.Id]));
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
							update: () =>
							{
								this.UpdateAnswer();
								return true;
							}
						}
					}
				}
			},
			xAxis: {
				title: { text: this.GetInstrumentFormatted("X1AxisLabel") },
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
			yAxis: {
				title: { text: this.GetInstrumentFormatted("Y1AxisLabel") },
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
			series: this.Items.map(item => item.GraphData)
		});
		this._chart = jquery(this.ChartElement()).highcharts();
	}

	protected HasValidAnswer(answer: any): boolean
	{
		if (!answer.Scalings) return false;

		return answer.Scalings.length == this.Items.length;
	}

	private UpdateAnswer(): void
	{
		this.SetAnswer({
			Scalings: this.Items.filter(i => i.GraphData != null).map(i => this.CreateAnswerItem(i))
		});
	}

	private CreateAnswerItem(item: Item): AnswerItem
	{
		var point = item.GraphData.data[0];

		return { Id: item.Id, Position: point.x.toString() + " " + point.y.toString() };
	}

	private CreateItem(data:any, answer:{x:number; y:number}):Item
	{
		var audioInfo = new AudioInfo([{ Type: data.Stimulus.Type, Source: data.Stimulus.URI }]);
		
		var item = {
			Id: data.Id,
			Name: this.GetFormatted(data.List.Label),
			AudioInfo: audioInfo,
			GraphData: answer ? this.CreateGraphItem(data, answer) : null
		};

		audioInfo.AddIsPlayingCallback(isPlaying =>
		{
			this.AddEvent(isPlaying ? "Start" : "Stop", data.Id);

			if (isPlaying && item.GraphData == null)
			{
				item.GraphData = this.CreateGraphItem(data, {x: 0, y: 0});

				this._chart.addSeries(item.GraphData);
			}
		});

		return item;
	}

	private CreateGraphItem(data: any, answer: { x: number; y: number }):HighchartsSeriesOptions
	{
		return {
			name: data.List.Label,
			draggableX: true,
			draggableY: true,
			cursor: "pointer",
			data: [answer]
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