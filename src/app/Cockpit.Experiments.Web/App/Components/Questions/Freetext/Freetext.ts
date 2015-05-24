import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class Freetext extends QuestionBase
{
	public Id: string;
	public Label: string = "";
	public Answer: KnockoutObservable<string> = knockout.observable<string>(null);

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;

		if(this.HasInstrument())
			this.Label = this.GetInstrument("Label");

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
		return true; //TODO: Check to see if text is required

		if (!answer.Text) return false;
		
		return answer.Text !== "";
	}
}

export = Freetext;