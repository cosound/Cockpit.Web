import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class RadioButtonGroup extends QuestionBase
{
	public Id: string;
	public Label: string;
	public Url: string;
	public Items: string[];
	public Answer: KnockoutObservable<string> = knockout.observable<string>(null);

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.Label = this.GetData("Label");
		this.Url = this.GetData("Url");
		this.Items = this.GetData("Items");

		if (this.HasAnswer()) this.Answer(this.GetAsnwer()["Value"]);
		this.Answer.subscribe(v => this.SetAnswer({ Value: v }));
	}
}

export = RadioButtonGroup;