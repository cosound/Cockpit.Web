import knockout = require("knockout");
import QuestionBase = require("ViewModels/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class ContinousScale2D
{
	private static BackgroundStrokeColor:string = "#eee";
	private static BackgroundLineSpacing: number = 10;
	private static BorderStrokeColor: string = "#000";
	private static AxisStrokeColor: string = "#000";
	private static PositionStrokeColor: string = "#000";
	private static PositionFillColor: string = "#999";
	private static LabelColor: string = "#000";
	private static LabelMargin:number = 5;

	public Context: KnockoutObservable<CanvasRenderingContext2D> = knockout.observable<CanvasRenderingContext2D>();
	public Width: KnockoutObservable<number> = knockout.observable<number>();
	public Height: KnockoutObservable<number> = knockout.observable<number>();

	private XMinLabel:string = "Cheap";
	private XMaxLabel: string = "Expensive";
	private YMinLabel: string = "Cool";
	private YMaxLabel: string = "Uncool";

	private _subscriptions: KnockoutSubscription[] = [];

	constructor()
	{
		this._subscriptions.push(this.Context.subscribe(() => this.Update()));
		this._subscriptions.push(this.Width.subscribe(() => this.Update()));
		this._subscriptions.push(this.Height.subscribe(() => this.Update()));
	}

	public SetPosition(x:number, y:number):void
	{
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
	}

	private Update():void
	{
		if (this.Context() == null || this.Width() == null || this.Height() == null) return;

		this.DrawBackground();
	}

	private DrawBackground():void
	{
		this.DrawGrid();
		this.DrawAxis();
		this.DrawLabels();
		this.DrawBorder();
	}

	private DrawGrid():void
	{
		var context = this.Context();
		var width = this.Width();
		var height = this.Height();

		context.beginPath();

		for (var x = 0.5; x < width; x += ContinousScale2D.BackgroundLineSpacing)
		{
			context.moveTo(x, 0);
			context.lineTo(x, height);
		} 
		
		for (var y = 0.5; y < height; y += ContinousScale2D.BackgroundLineSpacing)
		{
			context.moveTo(0, y);
			context.lineTo(width, y);
		}

		context.strokeStyle = ContinousScale2D.BackgroundStrokeColor;
		context.stroke();
	}

	private DrawAxis():void
	{
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
	}

	private DrawLabels(): void
	{
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
	}

	private DrawBorder(): void
	{
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
	}

	public dispose():void
	{
		for (var i = 0; i < this._subscriptions.length; i++)
			this._subscriptions[i].dispose();
	}
}

export = ContinousScale2D;