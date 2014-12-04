import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class Boolean extends QuestionBase
{
	public Id: string;
	public Text: string;
	public Answer: KnockoutObservable<string> = knockout.observable<string>(null);

	constructor(question:QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.Text = this.GetData("Text");

		if (this.HasAnswer()) this.Answer(this.GetAsnwer()["Value"]);
		this.Answer.subscribe(v => this.SetAnswer({ Value: v }));
	}
}

export = Boolean;