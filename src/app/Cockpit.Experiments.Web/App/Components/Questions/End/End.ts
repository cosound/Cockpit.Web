import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class End extends QuestionBase
{
	constructor(question: QuestionModel)
	{
		super(question, false);
	}

	public SlideCompleted(): void
	{
		this.SetAnswer({ Value: new Date() });
	}
}

export = End;