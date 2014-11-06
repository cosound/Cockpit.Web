import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import QuestionModel = require("Models/Question");
import AnswerModel = require("Models/Answer");

class QuestionsBase implements IQuestionViewModel
{
	public Data: QuestionModel;
	public AnswerType:string;

	constructor(question: QuestionModel, requiresInput:boolean = true)
	{
		this.Data = question;
		this.Data.RequiresInput = requiresInput;
	}

	public SetAnswer(data: { [key: string]: any }):void
	{
		this.Data.UserAnswer(new AnswerModel(this.AnswerType, data));
	}

	public SlideLoaded(): void
	{

	}

	public SlideCompleted():void
	{
		
	}
}

export = QuestionsBase;