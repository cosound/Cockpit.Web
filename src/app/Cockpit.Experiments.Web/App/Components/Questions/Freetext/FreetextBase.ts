import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class FreetextBase<T> extends QuestionBase<T>
{
	public Id: string;
	public Label: string = "";
	public Answer: KnockoutObservable<string> = knockout.observable<string>(null);
	public LabelPosition:string = "left";
	public LabelPositionLeft:boolean = false;
	public LabelPositionTop:boolean = false;
	public LabelPositionRight:boolean = false;
	public LabelPositionBottom:boolean = false;

	private _validation: RegExp;

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;

		if (this.HasInstrument())
		{
			this.Label = this.GetInstrumentFormatted("Label");

			var validation = this.GetInstrument("Validation");

			if (validation) this._validation = new RegExp(validation);
		}

		this.LabelPosition = this.GetInstrument("LabelPosition");

		switch (this.LabelPosition)
		{
			case "left":
				this.LabelPositionLeft = true;
				break;
			case "top":
				this.LabelPositionTop = true;
				break;
			case "right":
				this.LabelPositionRight = true;
				break;
			case "bottom":
				this.LabelPositionBottom = true;
				break;
		}

		if (this.HasAnswer())
			this.Answer(this.LoadText(this.GetAnswer()));

		this.Answer.extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 200 } });
		this.Answer.subscribe(v => this.UpdateAnswer(v));
	}

	protected UpdateAnswer(text:string):void
	{
		this.SetAnswer(this.SaveText(text));
	}

	protected LoadText(answer:T):string
	{
		throw new Error("Not implemented");
	}

	protected SaveText(answer: string): T
	{
		throw new Error("Not implemented");
	}

	protected HasValidAnswer(answer: T): boolean
	{
		if (!this._validation) return true;

		var text = answer == null ? "" : this.LoadText(answer);

		return this._validation.test(text);
	}
}

export = FreetextBase;