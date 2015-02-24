import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import QuestionModel = require("Models/Question");

class QuestionsBase implements IQuestionViewModel
{
	protected Model: QuestionModel;
	protected HasAnswer:KnockoutComputed<boolean>;

	constructor(question: QuestionModel, requiresInput:boolean = true)
	{
		this.Model = question;
		this.Model.RequiresInput = requiresInput;
		this.HasAnswer = knockout.computed(() => this.Model.Answer() != null);
	}

	protected GetData(key:string):any
	{
		return this.Model.Data[key];
	}

	protected GetAsnwer(): any
	{
		return this.HasAnswer() ? this.Model.Answer() : null;
	}

	protected SetAnswer(answer:any):void
	{
		this.Model.Answer(answer);
	}

	public SlideLoaded(): void
	{

	}

	public SlideCompleted():void
	{
		
	}
}

export = QuestionsBase;