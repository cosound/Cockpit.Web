import knockout = require("knockout");
import QuestionBase = require("ViewModels/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class Start extends QuestionBase
{
	constructor(question: QuestionModel)
	{
		super(question);

		this.SetAnswer({ Value: new Date() });
	}
}

export = Start;