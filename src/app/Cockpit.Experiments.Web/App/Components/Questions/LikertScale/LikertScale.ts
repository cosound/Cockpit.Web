import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type ItemInfo = { Id: string; Label: string; };
type Item = { Label:string; Id:string; Selected:string };

class LikertScale extends QuestionBase<{Id:string}>
{
	public Id: string;
	public HeaderLabel: string;
	public AudioLabel: string;
	public AudioInfo: AudioInfo = null;
	public Items: ItemInfo[];
	public Answer: KnockoutObservable<string> = knockout.observable<string>(null);
	public HasMedia: boolean = false;
	public CanAnswer: KnockoutObservable<boolean>;
	public AnswerIsRequired: boolean = true;
	public IsStimuliBlockVisible:boolean = true;

	private _alignForStimuli:boolean = true;

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.HeaderLabel = this.GetInstrumentFormatted("HeaderLabel");

		var stimulus = this.GetInstrument("Stimulus");
		if (stimulus != null)
		{
			this.AudioLabel = this.GetFormatted(stimulus.Label);

			this.AudioInfo = AudioInfo.Create(stimulus);
			this.TrackAudioInfo("/Instrument/Stimulus", this.AudioInfo);
			this.HasMedia = true;
		}

		var alignForStimuli = this.GetInstrument("AlignForStimuli");
		this._alignForStimuli = alignForStimuli === undefined || alignForStimuli === "1";
		this.IsStimuliBlockVisible = this._alignForStimuli || this.HasMedia;

		this.CanAnswer = this.WhenAllAudioHavePlayed(this.AudioInfo, true);
		this.AnswerIsRequired = this.GetInstrument("MinNoOfScalings") !== "0";

		this.Items = this.GetItems<Item, ItemInfo>(item => this.ItemInfo(item));

		if (this.HasAnswer()) this.Answer(this.GetAnswer().Id);
		this.Answer.subscribe(v =>
		{
			this.AddEvent("Change", "/Instrument", "Mouse/Left/Down", v);
			this.SetAnswer({ Id: v });
		});
	}

	protected HasValidAnswer(answer: any): boolean
	{
		return !this.AnswerIsRequired || answer.Id != undefined && answer.Id != null;
	}

	private ItemInfo(data: Item): ItemInfo
	{
		if (data.Selected === "1")
			this.Answer(data.Id);

		var info = {
			Id: data.Id,
			Label: this.GetFormatted(data.Label)
		};

		return info;
	}
}

export = LikertScale;