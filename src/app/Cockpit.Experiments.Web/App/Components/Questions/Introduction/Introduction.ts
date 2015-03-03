import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
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
		this.Header = this.GetInstrument("labelHeader");
		this.Text = this.GetInstrument("textContent");
		this.ImageUrl = this.GetInstrument("imageObject");
	}
}

export = Introduction;