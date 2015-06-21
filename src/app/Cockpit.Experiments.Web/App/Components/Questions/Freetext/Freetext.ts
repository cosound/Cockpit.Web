import FreetextBase = require("Components/Questions/Freetext/FreetextBase");
import QuestionModel = require("Models/Question");

type Answer = { Text: string };

class Freetext extends FreetextBase<Answer>
{
	constructor(question: QuestionModel)
	{
		super(question);

		this.Answer.subscribe(v =>
		{
			this.AddEvent("Change", "/Instrument", "Keyboard", v);
			this.SetAnswer(this.SaveAnswerAnswer(v));
		});
	}

	protected LoadAnswer(answer: Answer): void
	{
		this.Answer(answer.Text ? answer.Text : "");
	}

	protected SaveAnswerAnswer(answer: string): Answer
	{
		return { Text: answer };
	}
}

export = Freetext;