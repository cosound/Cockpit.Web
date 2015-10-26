import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type ItemInfo = { Id: string; UniqueId: string; Label: string; AudioInfo: AudioInfo; HasStimulus: boolean; IsActive:boolean; IsSelected: KnockoutComputed<boolean>; ButtonElement:KnockoutObservable<HTMLElement> };
type Item = { Id: string; ChoiceButton: { Label: string; Selected: string; Active?:boolean }; Stimulus:IStimulus };

class KacPS extends QuestionBase<{Id:string}>
{
	public Id: string;
	public HeaderLabel: string;
	public AudioLabel: string;
	public Items: ItemInfo[];
	public Answer: KnockoutObservable<string> = knockout.observable<string>(null);
	public CanAnswer: KnockoutObservable<boolean>;
	public HasNoStimulus: boolean;
	public MaxButtonWidth: KnockoutComputed<number>;

	private _hasActives:boolean;

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.HeaderLabel = this.GetInstrumentFormatted("HeaderLabel");

		this.Items = this.GetItems<Item, ItemInfo>(v => this.CreateItemInfo(v));

		this.MaxButtonWidth = knockout.computed(() => this.Items.map(i => i.ButtonElement() == null ? null : i.ButtonElement().offsetWidth).reduce((p, c) => p == null || c == null ? null : Math.max(p, c), 0));

		this.HasNoStimulus = this.Items.every(i => !i.HasStimulus);
		this._hasActives = this.Items.some(i => i.IsActive);

		this.CanAnswer = this.WhenAllAudioHavePlayed(this.Items.map(i => i.AudioInfo), true);

		if (this.HasAnswer()) this.Answer(this.GetAnswer().Id);
		this.Answer.subscribe(v =>
		{
			this.AddEvent("Change", "/Instrument", "Mouse/Left/Down", v);
			this.SetAnswer({ Id: v });
		});
	}

	protected HasValidAnswer(answer: any): boolean
	{
		return !this._hasActives || (answer.Id != undefined && answer.Id != null);
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
			Label: this.GetFormatted(data.ChoiceButton.Label),
			AudioInfo: audioInfo,
			IsSelected: knockout.computed(() => this.Answer() === data.Id),
			IsActive: data.ChoiceButton.Active == undefined || data.ChoiceButton.Active,
			HasStimulus: data.Stimulus !== null,
			ButtonElement: knockout.observable(null)
		};

		return info;
	}
}

export = KacPS;