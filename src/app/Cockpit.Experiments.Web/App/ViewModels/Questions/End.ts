import knockout = require("knockout");
import QuestionBase = require("ViewModels/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class End extends QuestionBase
{
	constructor(question: QuestionModel)
	{
		super(question);
	}
}

export = End;