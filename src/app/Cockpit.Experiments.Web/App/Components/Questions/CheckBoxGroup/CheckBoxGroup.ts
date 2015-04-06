import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

type CheckBoxInfo = { Id:string; Label: string; IsEnabled: KnockoutComputed<boolean>; };

class CheckBoxGroup extends QuestionBase
{
	public Id: string;
	public Label: string;
	public Url: string;
	public Items: CheckBoxInfo[];
	public Answer: KnockoutObservableArray<string> = knockout.observableArray<string>();
	public CanSelectMore:KnockoutComputed<boolean>;

	private _minNoOfSelections:number;
	private _maxNoOfSelections:number;

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.Label = this.GetInstrument("HeaderLabel");
		this.Url = this.GetInstrument("Stimulus");
		this._minNoOfSelections = this.GetInstrument("MinNoOfSelections");
		this._maxNoOfSelections = this.GetInstrument("MaxNoOfSelections");

		this.CanSelectMore = knockout.computed(() => this.Answer().length < this._maxNoOfSelections);

		this.Items = (<any[]>this.GetInstrument("Items").Item).map(v => this.CreateCheckBoxInfo(v));	

		if (this.HasAnswer()) this.Answer.push.apply(this.Answer, this.GetAsnwer()["Selections"]);
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