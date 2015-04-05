import knockout = require("knockout");
import jquery = require("jquery");
import Highcharts = require("Highcharts"); Highcharts;
import HighchartsMore = require("HighchartsMore"); HighchartsMore;
import HighChartsDraggablePoints = require("HighChartsDraggablePoints"); HighChartsDraggablePoints;
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

	constructor(question: QuestionModel)
	{
		super(question);

		this.Title = this.GetInstrument("HeaderLabel");
		this.Items = knockout.observableArray((<any[]>this.GetInstrument("Items").Item).map(i => this.CreateItem(i)));

		this._subscriptions.push(this.ChartElement.subscribe(this.InitializeChart, this));
	}

	private InitializeChart():void
	{
		var items = this.Items().map(i => i.GraphData);

		jquery(this.ChartElement()).highcharts({
			chart: {
				type: 'bubble'
			},
			title: {
				text: null
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
			series: items 
		});
	}

	private CreateItem(data:any):Item
	{
		return {
			Id: this.Id + "_" + data.Id,
			Name: data.List.Label,
			AudioInfo: new AudioInfo([{ Type: data.Stimulus.Type, Source: data.Stimulus.URI}]),
			GraphData: this.CreateGraphItem(data)
		}
	}

	private CreateGraphItem(data:any)
	{
		return {
			name: data.List.Label,
			draggableX: true,
			draggableY: true,
			data: [0, 0]
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