import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type ItemInfo = { Id: string; Label: string; AudioInfo: AudioInfo; IsEnabled: KnockoutComputed<boolean>; HasStimulus: boolean; };
type Item = { Id:string; ChoiceButton:{ Label:string; Selected:string }; Stimulus:Stimulus };

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

		this.Items = this.GetItems<Item, ItemInfo>(v => this.CreateItemInfo(v));

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

	private CreateItemInfo(data: Item): ItemInfo
	{
		if (data.ChoiceButton.Selected === "1")
			this.Answer.push(data.Id);

		var info = {
			Id: data.Id,
			Label: data.ChoiceButton.Label,
			AudioInfo: AudioInfo.Create(data.Stimulus),
			IsEnabled: knockout.computed(() => this.Answer.indexOf(data.Id) !== -1 || this.CanSelectMore()),
			HasStimulus: data.Stimulus !== null
		};

		return info;
	}
}

export = KacPS;