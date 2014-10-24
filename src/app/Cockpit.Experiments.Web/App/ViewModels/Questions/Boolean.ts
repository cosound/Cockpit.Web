import knockout = require("knockout");
import QuestionModels = require("Models/Questions");
import QuestionBase = require("ViewModels/Questions/QuestionBase");

class Boolean extends QuestionBase<QuestionModels.IBooleanQuestion>
{
	public Id: string;
	public Text: string;
	public Answer: KnockoutObservable<string>;

	public Initialize(): void
	{
		this.Id = this.Data.Id;
		this.Text = this.Data.Value;

		this.Answer = this.UserInput;
	}
}

export = Boolean;