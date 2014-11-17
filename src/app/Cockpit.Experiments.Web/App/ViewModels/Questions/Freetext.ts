import knockout = require("knockout");
import QuestionBase = require("ViewModels/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class Freetext extends QuestionBase
{
	public Id: string;
	public Label: string;
	public Answer: KnockoutObservable<string> = knockout.observable<string>(null);

	constructor(question: QuestionModel)
	{
		super(question);

		this.Id = this.Model.Id;
		this.Label = this.GetData("Value");

		if (this.HasAnswer()) this.Answer(this.GetAsnwer()["Value"]);
		this.Answer.extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 500 }});
		this.Answer.subscribe(v => this.SetAnswer({ Value: v }));
	}
}

export = Freetext;