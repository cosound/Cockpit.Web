import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type ItemInfo = { Id: string; Label: string; };
type Item = { Label:string; Id:string; Selected:string };

class LikertScale extends QuestionBase
{
	public Id: string;
	public HeaderLabel: string;
	public AudioLabel: string;
	public AudioInfo: AudioInfo;
	public Items: ItemInfo[];
	public Answer: KnockoutObservable<string> = knockout.observable<string>(null);
	public HasMedia: boolean = false;
	public CanAnswer:KnockoutObservable<boolean>;

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.HeaderLabel = this.GetInstrument("HeaderLabel");

		var stimulus = this.GetInstrument("Stimulus");
		if (stimulus != null)
		{
			this.AudioLabel = stimulus.Label;

			this.AudioInfo = AudioInfo.Create(stimulus);
			this.TrackAudioInfo("/Instrument/Stimulus", this.AudioInfo);
			this.HasMedia = true;
		}

		this.CanAnswer = this.GetObservableWhenAllAudioHavePlayed(this.AudioInfo);

		this.Items = this.GetItems<Item, ItemInfo>(item => this.ItemInfo(item));

		if (this.HasAnswer()) this.Answer(this.GetAsnwer()["Id"]);
		this.Answer.subscribe(v =>
		{
			this.AddEvent("Change", "/Instrument", "Mouse/Left/Down", v);
			this.SetAnswer({ Id: v });
		});
	}

	protected HasValidAnswer(answer: any): boolean
	{
		return answer.Id != undefined && answer.Id != null;
	}

	private ItemInfo(data: Item): ItemInfo
	{
		if (data.Selected === "1")
			this.Answer(data.Id);

		var info = {
			Id: data.Id,
			Label: data.Label
		};

		return info;
	}
}

export = LikertScale;