import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class CheckBoxGroup extends QuestionBase
{
	public Id: string;
	public Label: string;
	public Url: string;
	public Items: string[];
	public Answer: KnockoutObservableArray<string> = knockout.observableArray<string>();

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.Label = this.GetInstrument("HeaderLabel");
		this.Url = this.GetInstrument("Stimulus");

		this.Items = this.GetInstrument("Items").Item;

		if (this.HasAnswer()) this.Answer.push.apply(this.Answer, this.GetAsnwer()["Selections"]);
		this.Answer.subscribe(v => this.SetAnswer({ Selections: this.Answer(), Events: [] }));
	}
}

export = CheckBoxGroup;