import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import QuestionModel = require("Models/Question");
import AnswerModel = require("Models/Answer");

class QuestionsBase implements IQuestionViewModel
{
	protected Model: QuestionModel;
	protected HasAnswer:KnockoutComputed<boolean>;

	constructor(question: QuestionModel, requiresInput:boolean = true)
	{
		this.Model = question;
		this.Model.RequiresInput = requiresInput;
		this.HasAnswer = knockout.computed(() => this.Model.UserAnswer() != null);
	}

	protected GetData(key:string):any
	{
		return this.Model.Data[key];
	}

	protected GetAsnwer(): { [key: string]: any } 
	{
		return this.HasAnswer() ? this.Model.UserAnswer().Data : null;
	}

	protected SetAnswer(data: { [key: string]: any }):void
	{
		var id = this.Model.UserAnswer() == null ? null : this.Model.UserAnswer().Id;
		this.Model.UserAnswer(new AnswerModel(id, data));
	}

	public SlideLoaded(): void
	{

	}

	public SlideCompleted():void
	{
		
	}
}

export = QuestionsBase;