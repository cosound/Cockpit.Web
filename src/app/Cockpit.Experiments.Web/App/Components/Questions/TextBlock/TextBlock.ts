import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class TextBlock extends QuestionBase
{
	public Text: string;
	public HeaderLabel: string;
	public HasHeader: boolean;

	constructor(question: QuestionModel)
	{
		super(question, false);

		this.HeaderLabel = this.GetInstrumentFormatted("HeaderLabel");
		this.HasHeader = this.HeaderLabel != null && this.HeaderLabel !== "";

		this.Text = this.GetInstrumentFormatted("Text");
	}
}

export = TextBlock;