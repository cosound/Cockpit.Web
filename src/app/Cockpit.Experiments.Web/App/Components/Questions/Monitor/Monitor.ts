import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class Monitor extends QuestionBase
{
	constructor(question: QuestionModel)
	{
		super(question, false);
	}

	public SlideLoaded(): void
	{
		this.AddEvent("Trial Start");

		this.SetAnswer({ Contexts: [] });
	}

	public SlideCompleted(): void
	{
		this.AddEvent("Trial End");

		this.SetAnswer({ Contexts: [] });
	}
}

export = Monitor;