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
	public AudioInfo: AudioInfo;
	public AudioLabel: string;
	public HasMedia:boolean = false;
	public Answer: KnockoutObservable<number> = knockout.observable<number>(null);
	public IsValueNotSet:KnockoutComputed<boolean>;

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.HeaderLabel = this.GetInstrument("HeaderLabel");
		this.X1Ticks = this.GetInstrument("X1AxisTicks").X1AxisTick;
		this.X2Ticks = this.GetInstrument("X2AxisTicks").X2AxisTick;
		this.IsValueNotSet = knockout.computed(() => !(this.HasAnswer() && this.HasValidAnswer(this.Answer())));

		console.log(this.X2Ticks)

		var stimulus = this.GetInstrument("Stimulus");

		if (stimulus != null)
		{
			this.AudioLabel = stimulus.Label;
			this.AudioInfo = AudioInfo.Create(stimulus);
			this.AudioInfo.AddIsPlayingCallback(isPlaying => this.AddEvent(isPlaying ? "Start" : "Stop"));
			this.HasMedia = true;
		}

		if (this.HasAnswer()) this.Answer(this.GetAsnwer().Position);
		this.Answer.subscribe(v => this.SetAnswer({ Position: v }));
	}
}

export = OneDScale;