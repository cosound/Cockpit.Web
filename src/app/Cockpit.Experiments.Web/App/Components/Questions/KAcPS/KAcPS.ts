import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type ItemInfo = { Id: string; UniqueId: string; Label: string; AudioInfo: AudioInfo; HasStimulus: boolean; IsSelected:KnockoutComputed<boolean>; };
type Item = { Id:string; ChoiceButton:{ Label:string; Selected:string }; Stimulus:Stimulus };

class KacPS extends QuestionBase
{
	public Id: string;
	public HeaderLabel: string;
	public AudioLabel: string;
	public Items: ItemInfo[];
	public Answer: KnockoutObservable<string> = knockout.observable<string>(null);
	public CanAnswer: KnockoutObservable<boolean>;

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.HeaderLabel = this.GetInstrument("HeaderLabel");

		this.Items = this.GetItems<Item, ItemInfo>(v => this.CreateItemInfo(v));

		this.CanAnswer = this.GetObservableWhenAllAudioHavePlayed(this.Items.map(i => i.AudioInfo));

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

	private CreateItemInfo(data: Item): ItemInfo
	{
		if (data.ChoiceButton.Selected === "1")
			this.Answer(data.Id);

		var audioInfo = AudioInfo.Create(data.Stimulus);

		if(audioInfo !== null)
			this.TrackAudioInfo(`/Instrument/Items/Item(Id=${data.Id})/Stimulus`, audioInfo);

		var info = {
			Id: data.Id,
			UniqueId: this.Id + "_" + data.Id,
			Label: data.ChoiceButton.Label,
			AudioInfo: audioInfo,
			IsSelected: knockout.computed(() => this.Answer() === data.Id ),
			HasStimulus: data.Stimulus !== null
		};

		return info;
	}
}

export = KacPS;