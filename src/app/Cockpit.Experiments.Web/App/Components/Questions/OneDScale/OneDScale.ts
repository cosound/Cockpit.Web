import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type Tick = { Label: string; Position: number; RelativePosition:number; IsMinPosition:boolean; IsMaxPosition:boolean;}
type TickData = {Label:string; Position:string;}

class OneDScale extends QuestionBase
{
	private static _positionMinValue: number = -1;
	private static _positionMaxValue: number = 1;

	public Id: string;
	public HeaderLabel: string;

	public X1Ticks: Tick[];
	public X2Ticks: Tick[];
	public Y1Ticks: Tick[];
	public Y2Ticks: Tick[];

	public X1Height:KnockoutObservable<number> = knockout.observable(0);
	public X2Height:KnockoutObservable<number> = knockout.observable(0);

	public HasY1Ticks: boolean;
	public HasY2Ticks: boolean;

	public AudioInfo: AudioInfo = null;
	public AudioLabel: string;
	public HasMedia: boolean = false;

	public Answer: KnockoutObservable<number> = knockout.observable<number>(null);
	public IsValueNotSet: KnockoutComputed<boolean>;
	public CanAnswer: KnockoutObservable<boolean>;

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.HeaderLabel = this.GetInstrumentFormatted("HeaderLabel");
		this.X1Ticks = this.GetTicks("X1AxisTicks");
		this.X2Ticks = this.GetTicks("X2AxisTicks");
		this.Y1Ticks = this.GetTicks("Y1AxisTicks");
		this.Y2Ticks = this.GetTicks("Y2AxisTicks");
		this.HasY1Ticks = this.Y1Ticks.length !== 0;
		this.HasY2Ticks = this.Y2Ticks.length !== 0;

		this.IsValueNotSet = knockout.computed(() => !(this.HasAnswer() && this.HasValidAnswer(this.Answer())));

		var stimulus = this.GetInstrument("Stimulus");

		if (stimulus != null)
		{
			this.AudioLabel = this.GetFormatted(stimulus.Label);
			this.AudioInfo = AudioInfo.Create(stimulus);
			this.TrackAudioInfo("/Instrument/Stimulus", this.AudioInfo);
			this.HasMedia = true;
		}

		this.CanAnswer = this.WhenAllAudioHavePlayed(this.AudioInfo, true);

		if (this.HasAnswer()) this.Answer(this.GetAsnwer().Position);
		this.Answer.subscribe(v =>
		{
			this.AddEvent("Change", "/Instrument", "Mouse/Left/Down", v.toString());
			this.SetAnswer({ Position: v });
		});
	}

	private GetTicks(name:string):Tick[]
	{
		var ticksContainer = this.GetInstrument(name);

		if (!ticksContainer) return new Array<Tick>();

		var ticks = this.GetArray<TickData>(ticksContainer[name.slice(0, -1)]).map(t => this.CreateTick(t)).filter(t => t != null);

		return ticks;
	}

	private CreateTick(data:TickData):Tick
	{
		if (data.Label == null || data.Position == null)
		{
			console.log("OneDScale tick skipped because of missing data: " + JSON.stringify(data));
			return null;
		}

		var position = parseFloat(data.Position);

		return {
			Label: this.GetFormatted(data.Label),
			Position: position,
			RelativePosition: (position - OneDScale._positionMinValue) / (OneDScale._positionMaxValue - OneDScale._positionMinValue),
			IsMinPosition: position === OneDScale._positionMinValue,
			IsMaxPosition: position === OneDScale._positionMaxValue
		}
	}
}

export = OneDScale;