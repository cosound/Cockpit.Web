import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import QuestionModel = require("Models/Question");

class QuestionsBase implements IQuestionViewModel
{
	protected Model: QuestionModel;
	protected HasAnswer: KnockoutComputed<boolean>;
	private _events: CockpitPortal.IQuestionEvent[];

	constructor(question: QuestionModel, requiresInput:boolean = true)
	{
		this.Model = question;
		this.Model.RequiresInput = requiresInput;
		this.HasAnswer = knockout.computed(() => this.Model.Answer() != null);

		if (this.HasAnswer())
		{
			var answer = this.Model.Answer();

			this._events = answer.Events ? answer.Events : new Array<CockpitPortal.IQuestionEvent>();
		} else {
			this._events = new Array<CockpitPortal.IQuestionEvent>();
		}
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

	protected SetAnswer(answer: any):void
	{
		answer.Events = this._events;

		this.Model.Answer(answer);
	}

	protected AddEvent(type:string)
	{
		var event = {
			Id: "None",
			Type: type,
			Method: "None",
			Data: "None",
			DateTime: new Date()
		};

		this._events.push(event);
	}

	public SlideLoaded(): void
	{

	}

	public SlideCompleted():void
	{
		
	}
}

export = QuestionsBase;