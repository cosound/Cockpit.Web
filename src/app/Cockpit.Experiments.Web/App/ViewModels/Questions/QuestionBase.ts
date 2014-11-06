import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import QuestionModel = require("Models/Question");
import AnswerModel = require("Models/Answer");

class QuestionsBase
{
	public Data: QuestionModel;
	public AnswerType:string;

	constructor(question: QuestionModel)
	{
		this.Data = question;
	}

	public SetAnswer(data: { [key: string]: any }):void
	{
		this.Data.UserAnswer(new AnswerModel(this.AnswerType, data));
	}
}

export = QuestionsBase;