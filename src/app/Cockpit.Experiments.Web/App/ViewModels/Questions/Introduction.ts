import knockout = require("knockout");
import QuestionBase = require("ViewModels/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class Introduction extends QuestionBase
{
	public Id: string;
	public Header: string;
	public Text: string;
	public ImageUrl: string;

	constructor(question: QuestionModel)
	{
		super(question, false);

		this.Id = this.Model.Id;
		this.Header = this.GetData("labelHeader");
		this.Text = this.GetData("textContent");
		this.ImageUrl = this.GetData("imageObject");
	}
}

export = Introduction;