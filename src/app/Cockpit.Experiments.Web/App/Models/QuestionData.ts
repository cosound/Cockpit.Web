import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");

class QuestionData
{
	public Name: string;
	public Data: CockpitPortal.IQuestion;
	public UserInput: KnockoutObservable<string> = knockout.observable<string>();

	constructor(data: CockpitPortal.IQuestion, answerChangedCallback:()=>void)
	{
		this.Name = "Questions/" + data.Fullname.substr(0, data.Fullname.indexOf("Question"));
		this.Data = data;

		this.UserInput.subscribe(v => answerChangedCallback());
	}
}

export = QuestionData;