import knockout = require("knockout");
import QuestionModels = require("Models/Questions");
import QuestionBase = require("ViewModels/Questions/QuestionBase");

class AB extends QuestionBase<QuestionModels.IABQuestion>
{
	public Id: string;
	public Text: string;
	public Url1: string;
	public Url2: string;
	public Answer: KnockoutObservable<string>;

	public Initialize(): void
	{
		this.Id = this.Data.Id;
		this.Text = this.Data.Text;
		this.Url1 = this.Data.Url1;
		this.Url2 = this.Data.Url2;

		this.Answer = this.UserInput;
	}
}

export = AB;