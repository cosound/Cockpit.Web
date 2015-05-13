import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type ItemInfo = { Id: string; Label: string; IsEnabled: KnockoutComputed<boolean>; };
type Item = { Label: string; Id: string; Selected: string };

class CheckBoxGroup extends QuestionBase
{
	private _minNoOfSelections: number;
	private _maxNoOfSelections: number;

	public Id: string;
	public HeaderLabel: string;
	public AudioLabel: string;
	public AudioInfo: AudioInfo = null;
	public Items: ItemInfo[];
	public Answer: KnockoutObservableArray<string> = knockout.observableArray<string>();
	public CanSelectMore: KnockoutComputed<boolean>;
	public HasMedia: boolean = false;
	public CanAnswer: KnockoutObservable<boolean>;

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.HeaderLabel = this.GetInstrument("HeaderLabel");
		this._minNoOfSelections = this.GetInstrument("MinNoOfSelections");
		this._maxNoOfSelections = this.GetInstrument("MaxNoOfSelections");

		var stimulus = this.GetInstrument("Stimulus");
		if (stimulus != null)
		{
			this.AudioLabel = stimulus.Label;

			this.AudioInfo = new AudioInfo([{ Type: stimulus.Type, Source: stimulus.URI }]);
			this.TrackAudioInfo("/Instrument/Stimulus", this.AudioInfo);
			this.HasMedia = true;
		}

		this.CanAnswer = this.GetObservableWhenAllAudioHavePlayed(this.AudioInfo);

		this.CanSelectMore = knockout.computed(() => this.Answer().length < this._maxNoOfSelections);

		this.Items = this.GetItems<Item, ItemInfo>(v => this.CreateItemInfo(v));

		if (this.HasAnswer())
		{
			if (this.GetAsnwer()["Selections"])
				this.Answer.push.apply(this.Answer, this.GetAsnwer()["Selections"]);
			else
				this.SetAnswer({ Selections: [] });
		}
		
		this.Answer.subscribe(v =>
		{
			this.AddEvent("Change", "/Instrument", "Mouse/Left/Down", v.join(","));
			this.SetAnswer({ Selections: v });
		});
	}

	protected HasValidAnswer(answer: any): boolean
	{
		if (!answer.Selections) return false;

		return answer.Selections.length >= this._minNoOfSelections;
	}

	private CreateItemInfo(data: Item):ItemInfo
	{
		if (data.Selected === "1")
			this.Answer.push(data.Id);

		var info = {
			Id: data.Id,
			Label: data.Label,
			IsEnabled: knockout.computed(() => this.CanAnswer() && (this.Answer.indexOf(data.Id) !== -1 || this.CanSelectMore()))
		};

		return info;
	}
}

export = CheckBoxGroup;