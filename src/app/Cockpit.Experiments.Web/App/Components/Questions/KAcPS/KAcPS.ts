import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type ItemInfo = { Id: string; Label: string; AudioInfo: AudioInfo; IsEnabled: KnockoutComputed<boolean>; };

class KacPS extends QuestionBase
{
	private _minNoOfSelections: number;
	private _maxNoOfSelections: number;

	public HeaderLabel: string;
	public AudioLabel: string;
	public Items: ItemInfo[];
	public Answer: KnockoutObservableArray<string> = knockout.observableArray<string>();
	public CanSelectMore: KnockoutComputed<boolean>;

	constructor(question: QuestionModel)
	{
		super(question);

		this.HeaderLabel = this.GetInstrument("HeaderLabel");
		this._minNoOfSelections = parseInt(this.GetInstrument("MinNoOfScalings"));
		this._maxNoOfSelections = parseInt(this.GetInstrument("MaxNoOfScalings"));

		this.CanSelectMore = knockout.computed(() => this.Answer().length < this._maxNoOfSelections);

		this.Items = (<any[]>this.GetInstrument("Items").Item).map(v => this.CreateItemInfo(v));

		if (this.HasAnswer())
		{
			if (this.GetAsnwer()["Selections"])
				this.Answer.push.apply(this.Answer, this.GetAsnwer()["Selections"]);
			else
				this.SetAnswer({ Selections: [] });
		}

		this.Answer.subscribe(v => this.SetAnswer({ Selections: this.Answer() }));
	}

	protected HasValidAnswer(answer: any): boolean
	{
		if (!answer.Selections) return false;

		return answer.Selections.length >= this._minNoOfSelections;
	}

	private CreateItemInfo(data: { Id: string; ChoiceButton: { Label: string; Selected: string }; Stimulus: {Type:string; URI:string; Label:string} }): ItemInfo
	{
		if (data.ChoiceButton.Selected === "1")
			this.Answer.push(data.Id);

		var info = {
			Id: data.Id,
			Label: data.ChoiceButton.Label,
			AudioInfo: new AudioInfo([{ Type: data.Stimulus.Type, Source: data.Stimulus.URI }]),
			IsEnabled: knockout.computed(() => this.Answer.indexOf(data.Id) != -1 || this.CanSelectMore())
		};

		return info;
	}
}

export = KacPS;