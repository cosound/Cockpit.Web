import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class OneDScale extends QuestionBase
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
		this.Label = this.GetInstrument("HeaderLabel");
		this.MinLabel = this.GetInstrument("X1AxisLabel");
		this.MaxLabel = this.GetInstrument("Y1AxisLabel");

		if (this.HasAnswer()) this.Answer(this.GetAsnwer().Position);
		this.Answer.subscribe(v => this.SetAnswer({ Position: v }));
	}
}

export = OneDScale;