import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class Unsupported extends QuestionBase
{
	constructor(question: QuestionModel)
	{
		super(question, false);
		console.log("Unsupported question type: " + question.APIType);
	}
}

export = Unsupported; 