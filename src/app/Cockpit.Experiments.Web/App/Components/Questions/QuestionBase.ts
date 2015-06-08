import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import QuestionModel = require("Models/Question");
import AudioInfo = require("Components/Players/Audio/AudioInfo");
import TextFormatter = require("Managers/TextFormatter");

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

		setTimeout(() =>
		{
			this.UpdateIsAnswerValid();
			this.Model.Loaded();
		}, 0); //Give decendent time to override HasValidAnswer 
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
			if (key !== "Events") return true;

		return false;
	}

	protected GetFormatted(unformatted:string):string
	{
		return (unformatted === null || unformatted === undefined) ? unformatted : TextFormatter.Format(unformatted);
	}

	protected GetInstrument(key:string):any
	{
		return this.GetIntrumentObject()[key];
	}

	protected GetInputs():any[]
	{
		return this.Model === null || this.Model.Input === null ? new Array<any>() : this.Model.Input;
	}

	protected GetInstrumentFormatted(key: string): string
	{
		var instrument = this.GetInstrument(key);

		if (instrument === null || instrument === undefined) return instrument;
		if (typeof instrument === "string") return this.GetFormatted(instrument);

		throw new Error(`Instrument ${key} is not a string but: ${instrument}`);
	}

	private GetIntrumentObject():{ [key:string]:any }
	{
		var inputs = this.GetInputs();

		for (var i = 0; i < inputs.length; i++)
		{
			if (inputs[i].Instrument) return inputs[i].Instrument;
		}

		throw new Error("Intrument object not found in input");
	}

	protected HasInstrument():boolean
	{
		var inputs = this.GetInputs();

		for (var i = 0; i < inputs.length; i++)
		{
			if (inputs[i].Instrument) return true;
		}
		return false;
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

	protected RowItems<T>(items: T[], columnCount: number): T[][]
	{
		var result = new Array<T[]>();
		var row: T[];

		items.forEach((item, index) =>
		{
			if (index % columnCount === 0)
			{
				row = new Array<T>();
				result.push(row);
			}

			row.push(item);
		});

		return result;
	}

	protected AddEvent(type:string, id:string = null, method:string = "None", data:string = "None")
	{
		var event = {
			Id: id === null ? "None" : id,
			Type: type,
			Method: method,
			Data: data,
			DateTime: new Date()
		};

		this._events.push(event);
	}

	protected TrackAudioInfo(id:string, audioInfo:AudioInfo):void
	{
		audioInfo.AddIsPlayingCallback(isPlaying => this.AddEvent(isPlaying ? "Start" : "Stop", id, "AudioDevice"));
	}

	protected WhenAllAudioHavePlayed(audio:AudioInfo|AudioInfo[], returnTrueOnAnswer:boolean = false):KnockoutComputed<boolean>
	{
		if (audio == null) return knockout.computed(() => true);

		if (audio instanceof AudioInfo)
			audio = [<AudioInfo>audio];

		var allHavePlayed = knockout.observable(false);
		var numberOfPlays = 0;

		(<AudioInfo[]>audio).forEach(a =>
		{
			if (a === null)
				numberOfPlays++;
			else
			{
				a.AddIsPlayingCallback(() => {
					if (++numberOfPlays === (<AudioInfo[]>audio).length) allHavePlayed(true);
				}, true);
			}
		});

		allHavePlayed(numberOfPlays === (<AudioInfo[]>audio).length);

		return knockout.computed(() => this.HasAnswer() || allHavePlayed());
	}

	public SlideLoaded(): void
	{
		
	}

	public SlideCompleted():boolean
	{
		return false;
	}
}

export = QuestionsBase;