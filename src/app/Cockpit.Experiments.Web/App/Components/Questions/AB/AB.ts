import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class AB extends QuestionBase
{
	public Id: string;
	public Text: string;
	public Url1: string;
	public Url2: string;
	public Answer: KnockoutObservable<string> = knockout.observable<string>(null);

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.Text = this.GetInstrument("Text");
		this.Url1 = this.GetInstrument("Url1");
		this.Url2 = this.GetInstrument("Url2");

		if (this.HasAnswer()) this.Answer(this.GetAsnwer()["Value"]);
		this.Answer.subscribe(v => this.SetAnswer({ Value: v }));
	}
}

export = AB;