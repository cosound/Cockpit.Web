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
		super(question);

		this.Id = this.Data.Id;
		this.Header = this.Data.Data["labelHeader"];
		this.Text = this.Data.Data["textContent"];
		this.ImageUrl = this.Data.Data["imageObject"];
	}
}

export = Introduction;