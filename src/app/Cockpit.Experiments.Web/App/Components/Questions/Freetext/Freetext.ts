import FreetextBase = require("Components/Questions/Freetext/FreetextBase");
import QuestionModel = require("Models/Question");

type Answer = { Text: string };

class Freetext extends FreetextBase<Answer>
{
	constructor(question: QuestionModel)
	{
		super(question);
	}

	protected UpdateAnswer(text: string): void
	{
		this.AddEvent("Change", "/Instrument", "Keyboard", text);
		super.UpdateAnswer(text);
	}

	protected LoadText(answer: Answer): string
	{
		return answer == null || answer.Text == null ? "" : answer.Text;
	}

	protected SaveText(answer: string): Answer
	{
		return { Text: answer };
	}
}

export = Freetext;