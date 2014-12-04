import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class Start extends QuestionBase
{
	constructor(question: QuestionModel)
	{
		super(question, false);
	}

	public SlideLoaded(): void
	{
		if(!this.HasAnswer())
			this.SetAnswer({ Value: new Date() });
	}
}

export = Start;