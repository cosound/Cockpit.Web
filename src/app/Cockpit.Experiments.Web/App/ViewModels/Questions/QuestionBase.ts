import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import QuestionModel = require("Models/Question");
import AnswerModel = require("Models/Answer");

class QuestionsBase implements IQuestionViewModel
{
	public Data: QuestionModel;
	public HasAnswer:KnockoutComputed<boolean>;

	constructor(question: QuestionModel, requiresInput:boolean = true)
	{
		this.Data = question;
		this.Data.RequiresInput = requiresInput;
		this.HasAnswer = knockout.computed(() => this.Data.UserAnswer() != null);
	}

	public GetAsnwer(): { [key: string]: string } 
	{
		return this.HasAnswer() ? this.Data.UserAnswer().Data : null;
	}

	public SetAnswer(data: { [key: string]: any }):void
	{
		var id = this.Data.UserAnswer() == null ? null : this.Data.UserAnswer().Id;
		this.Data.UserAnswer(new AnswerModel(id, data));
	}

	public SlideLoaded(): void
	{

	}

	public SlideCompleted():void
	{
		
	}
}

export = QuestionsBase;