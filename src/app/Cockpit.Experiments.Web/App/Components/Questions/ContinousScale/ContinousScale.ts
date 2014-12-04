import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class ContinousScale extends QuestionBase
{
	public Id: string;
	public Label: string;
	public MinLabel: string;
	public MaxLabel: string;
	public Answer: KnockoutObservable<number> = knockout.observable<number>(null);

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.Label = this.GetData("Label");
		this.MinLabel = this.GetData("Items")[0];
		this.MaxLabel = this.GetData("Items")[1];

		if (this.HasAnswer()) this.Answer(this.GetAsnwer()["Value"]);
		this.Answer.subscribe(v => this.SetAnswer({ Value: v }));
	}
}

export = ContinousScale;