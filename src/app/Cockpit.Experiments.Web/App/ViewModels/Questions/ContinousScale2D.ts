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
		this._context.fillRect(10, 10, 100, 100);
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