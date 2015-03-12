import knockout = require("knockout");
import jquery = require("jquery");
import Highcharts = require("Highcharts"); Highcharts;
import HighchartsMore = require("HighchartsMore"); HighchartsMore;
import HighChartsDraggablePoints = require("HighChartsDraggablePoints"); HighChartsDraggablePoints;
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class TwoDScaleK extends QuestionBase
{
	public ChartElement: KnockoutObservable<HTMLElement> = knockout.observable<HTMLElement>();

	private _subscriptions: KnockoutSubscription[] = [];

	constructor(question: QuestionModel)
	{
		super(question);

		this._subscriptions.push(this.ChartElement.subscribe(this.InitializeChart, this));
	}

	private InitializeChart():void
	{
		var items = this.GetInstrument("Items").Item.map(this.CreateGraphItem);

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
			series: items 
		});
	}

	private CreateGraphItem(item:any)
	{
		return {
			name: item.List.Label,
			draggableX: true,
			draggableY: true,
			data: [0, 0, 5]
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