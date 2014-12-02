import knockout = require("knockout");
import QuestionBase = require("ViewModels/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class ContinousScale2D
{
	public Context: KnockoutObservable<CanvasRenderingContext2D> = knockout.observable<CanvasRenderingContext2D>();

	private _contextSubscription: KnockoutSubscription;
	private _context:CanvasRenderingContext2D;

	constructor()
	{
		this._contextSubscription = this.Context.subscribe(v => this.ContextChanged(v));
	}

	public ContextChanged(context:CanvasRenderingContext2D)
	{
		this._context = context;
		this.DrawGrid();
	}

	public SetPosition(x:number, y:number):void
	{
		this._context.clearRect(0, 0, 300, 300);
		this.DrawGrid();

		this._context.beginPath();

		this._context.arc(x, y, 5, 0, Math.PI * 2, false);

		this._context.closePath();

		this._context.strokeStyle = "#000";
		this._context.stroke();
		this._context.fillStyle = "#999";
		this._context.fill();
	}

	private DrawGrid():void
	{
		for (var x = 0.5; x < 300; x += 10)
		{
			this._context.moveTo(x, 0);
			this._context.lineTo(x, 300);
		} 
		
		for (var y = 0.5; y < 300; y += 10)
		{
			this._context.moveTo(0, y);
			this._context.lineTo(300, y);
		}

		this._context.strokeStyle = "#eee";
		this._context.stroke();
	}

	private CleanContextSubscription():void
	{
		if (this._contextSubscription == null) return;
		this._contextSubscription.dispose();
		this._contextSubscription = null;
	}

	public dispose():void
	{
		this.CleanContextSubscription();
	}
}

export = ContinousScale2D;