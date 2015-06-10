import FreetextBase = require("Components/Questions/Freetext/FreetextBase");

type Answer = { Text: string };

class Freetext extends FreetextBase<Answer>
{
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