import knockout = require("knockout");
import jquery = require("jquery");
import Highcharts = require("Highcharts"); Highcharts;
import HighchartsMore = require("HighchartsMore"); HighchartsMore;
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
			series: this.GetInstrument("Items").Item.forEach((v:any) => { return { name: v.List, data: [0, 0, 5] }; })
		});
	}

	public dispose():void
	{
		this.ChartElement(null);

		for (var i = 0; i < this._subscriptions.length; i++)
			this._subscriptions[i].dispose();
	}
}

export = TwoDScaleK;