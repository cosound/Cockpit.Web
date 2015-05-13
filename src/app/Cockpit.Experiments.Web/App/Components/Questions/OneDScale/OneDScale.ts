import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type Ticks = {Label:string; Position:string;}

class OneDScale extends QuestionBase
{
	public Id: string;
	public HeaderLabel: string;
	public X1Ticks: Ticks[];
	public X2Ticks: Ticks[];
	public MaxLabel: string;
	public AudioInfo: AudioInfo = null;
	public AudioLabel: string;
	public HasMedia:boolean = false;
	public Answer: KnockoutObservable<number> = knockout.observable<number>(null);
	public IsValueNotSet: KnockoutComputed<boolean>;
	public HasX1Ticks:boolean;
	public HasX2Ticks: boolean;
	public CanAnswer: KnockoutObservable<boolean>;

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.HeaderLabel = this.GetInstrument("HeaderLabel");
		this.X1Ticks = this.GetInstrument("X1AxisTicks") ? this.GetInstrument("X1AxisTicks").X1AxisTick : null;
		this.X2Ticks = this.GetInstrument("X2AxisTicks") ? this.GetInstrument("X2AxisTicks").X2AxisTick : null;
		this.HasX1Ticks = this.X1Ticks != null;
		this.HasX2Ticks = this.X2Ticks != null;
		this.IsValueNotSet = knockout.computed(() => !(this.HasAnswer() && this.HasValidAnswer(this.Answer())));

		var stimulus = this.GetInstrument("Stimulus");

		if (stimulus != null)
		{
			this.AudioLabel = stimulus.Label;
			this.AudioInfo = AudioInfo.Create(stimulus);
			this.TrackAudioInfo("/Instrument/Stimulus", this.AudioInfo);
			this.HasMedia = true;
		}

		this.CanAnswer = this.GetObservableWhenAllAudioHavePlayed(this.AudioInfo);

		if (this.HasAnswer()) this.Answer(this.GetAsnwer().Position);
		this.Answer.subscribe(v =>
		{
			this.AddEvent("Change", "/Instrument", "Mouse/Left/Down", v.toString());
			this.SetAnswer({ Position: v });
		});
	}
}

export = OneDScale;