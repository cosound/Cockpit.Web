import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type CheckBoxInfo = { Id:string; Label: string; IsEnabled: KnockoutComputed<boolean>; };

class CheckBoxGroup extends QuestionBase
{
	private _minNoOfSelections: number;
	private _maxNoOfSelections: number;

	public Id: string;
	public HeaderLabel: string;
	public AudioLabel: string;
	public AudioInfo: AudioInfo;
	public Items: CheckBoxInfo[];
	public Answer: KnockoutObservableArray<string> = knockout.observableArray<string>();
	public CanSelectMore: KnockoutComputed<boolean>;
	public HasMedia: boolean = false;

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
			this.HasMedia = true;
		}

		this.CanSelectMore = knockout.computed(() => this.Answer().length < this._maxNoOfSelections);

		this.Items = (<any[]>this.GetInstrument("Items").Item).map(v => this.CreateCheckBoxInfo(v));	

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

	private CreateCheckBoxInfo(data:{Label:string; Id:string}):CheckBoxInfo
	{
		var info = {
			Id: data.Id,
			Label: data.Label,
			IsEnabled: knockout.computed(() => this.Answer.indexOf(data.Id) != -1 || this.CanSelectMore())
		};

		return info;
	}
}

export = CheckBoxGroup;