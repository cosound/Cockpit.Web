import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

class OneDScale extends QuestionBase
{
	public Id: string;
	public Label: string;
	public MinLabel: string;
	public MaxLabel: string;
	public AudioInfo: AudioInfo;
	public AudioLabel: string;
	public HasMedia:boolean = false;
	public Answer: KnockoutObservable<number> = knockout.observable<number>(null);

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.Label = this.GetInstrument("HeaderLabel");
		this.MinLabel = this.GetInstrument("X1AxisLabel");
		this.MaxLabel = this.GetInstrument("Y1AxisLabel");

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