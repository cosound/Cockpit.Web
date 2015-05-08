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

		setTimeout(() => this.UpdateIsAnswerValid(), 0); //Give decendent time to override HasValidAnswer 
	}

	protected UpdateIsAnswerValid(answer?:any):void
	{
		answer = answer || this.GetAsnwer();

		if (answer == null)
			this.Model.HasValidAnswer(false);
		else
			this.Model.HasValidAnswer(this.HasValidAnswer(answer));
	}

	protected HasValidAnswer(answer:any):boolean
	{
		for (var key in answer)
			if (key != "Events") return true;

		return false;
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

		this.UpdateIsAnswerValid(answer);
		this.Model.Answer(answer);
	}

	protected GetArray<T>(data:T|T[]):T[]
	{
		if (data instanceof Array) return <T[]>(data);
		return [<T>data];
	}

	protected GetItems<TInput, TOutput>(converter:(item:TInput)=>TOutput):TOutput[]
	{
		return this.GetArray<TInput>(this.GetInstrument("Items").Item).map(converter);
	}

	protected AddEvent(type:string, id:string = null)
	{
		var event = {
			Id: id === null ? "None" : id,
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