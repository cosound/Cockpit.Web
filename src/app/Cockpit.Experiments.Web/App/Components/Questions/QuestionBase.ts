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

	protected GetInstrument(key:string):any
	{
		return this.GetIntrumentObject()[key];
	}

	private GetIntrumentObject():{ [key:string]:any }
	{
		for (var i = 0; i < this.Model.Input.length; i++)
		{
			if (this.Model.Input[i].Instrument) return this.Model.Input[i].Instrument;
		}

		throw new Error("Intrument object not found in input");
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