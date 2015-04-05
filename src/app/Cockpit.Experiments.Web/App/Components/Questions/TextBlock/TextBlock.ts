import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class TextBlock extends QuestionBase
{
	public Text: string;

	constructor(question: QuestionModel)
	{
		super(question);

		this.Text = this.GetInstrument("Text");
	}
}

export = TextBlock;