import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type CheckBoxInfo = { Id: string; Label: string; IsEnabled: KnockoutComputed<boolean>; };
type Item = { Label:string; Id:string; Selected:string };

class LikertScale extends QuestionBase
{
	private _minNoOfSelections: number;
	private _maxNoOfSelections: number;

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

		this.HeaderLabel = this.GetInstrument("HeaderLabel");
		this._minNoOfSelections = parseInt(this.GetInstrument("MinNoOfScalings"));
		this._maxNoOfSelections = parseInt(this.GetInstrument("MaxNoOfScalings"));

		var stimulus = this.GetInstrument("Stimulus");

		if (stimulus != null)
		{
			this.AudioLabel = stimulus.Label;

			this.AudioInfo = AudioInfo.Create(stimulus);
			this.TrackAudioInfo("/Instrument/Stimulus", this.AudioInfo);
			this.HasMedia = true;
		}

		this.CanSelectMore = knockout.computed(() => this.Answer().length < this._maxNoOfSelections);

		this.Items = this.GetItems<Item, CheckBoxInfo>(item => this.CreateCheckBoxInfo(item));

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
			this.SetAnswer({ Selections: v })
		});
	}

	protected HasValidAnswer(answer: any): boolean
	{
		if (!answer.Selections) return false;

		return answer.Selections.length >= this._minNoOfSelections;
	}

	private CreateCheckBoxInfo(data: Item): CheckBoxInfo
	{
		if (data.Selected === "1")
			this.Answer.push(data.Id);

		var info = {
			Id: data.Id,
			Label: data.Label,
			IsEnabled: knockout.computed(() => this.Answer.indexOf(data.Id) !== -1 || this.CanSelectMore())
		};

		return info;
	}
}

export = LikertScale;