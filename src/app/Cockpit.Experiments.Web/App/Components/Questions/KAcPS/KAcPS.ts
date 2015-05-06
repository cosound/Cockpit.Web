import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class KAcPS extends QuestionBase
{
	constructor(question: QuestionModel)
	{
		super(question);

	}

	protected HasValidAnswer(answer: any): boolean
	{
		return true;
	}
}

export = KAcPS;