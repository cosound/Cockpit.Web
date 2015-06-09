import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class Freetext extends QuestionBase
{
	public Id: string;
	public Label: string = "";
	public Answer: KnockoutObservable<string> = knockout.observable<string>(null);

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
			

		if (this.HasAnswer()) this.LoadAnswer(this.GetAsnwer());
		this.Answer.extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 200 }});
		this.Answer.subscribe(v =>
		{
			this.AddEvent("Change", "/Instrument", "Keyboard", v);
			this.SetAnswer(this.SaveAnswerAnswer(v));
		});
	}

	protected LoadAnswer(answer:any):void
	{
		this.Answer(answer["Text"]);
	}

	protected SaveAnswerAnswer(answer:string): any
	{
		return { Text: answer };
	}

	protected HasValidAnswer(answer: any): boolean
	{
		if (!this._validation) return true;

		if (answer === null) answer = "";

		return this._validation.test(answer);
	}
}

export = Freetext;