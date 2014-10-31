import knockout = require("knockout");
import QuestionBase = require("ViewModels/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class Boolean extends QuestionBase
{
	public Id: string;
	public Text: string;
	public Answer: KnockoutObservable<string> = knockout.observable<string>(null);

	constructor(question:QuestionModel)
	{
		super(question);

		this.Id = this.Data.Id;
		this.Text = this.Data.Data["Text"];
		this.AnswerType = "BooleanAnswer, 1.0";

		this.Answer.subscribe(v => this.SetAnswer({ Value: v }));
	}
}

export = Boolean;