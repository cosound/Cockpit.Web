import knockout = require("knockout");
import QuestionBase = require("ViewModels/Questions/QuestionBase");
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

		this.Id = this.Data.Id;
		this.Text = this.Data.Data["Text"];
		this.Url1 = this.Data.Data["Url1"];
		this.Url2 = this.Data.Data["Url2"];
		this.AnswerType = "ABAnswer, 1.0";

		this.Answer.subscribe(v => this.SetAnswer({ Value: v }));
	}
}

export = AB;