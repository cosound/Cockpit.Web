import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import Answer = require("Models/Answer");

class Question
{
	public Id: string;
	public Type: string;
	public Version: string;
	public Data: {[key:string]:string} = {};
	public UserAnswer: KnockoutObservable<Answer> = knockout.observable<Answer>();

	constructor(question: CockpitPortal.IQuestion, answerChangedCallback: (question: Question)=>void)
	{
		var typeInfo = question.Type.split(", ");

		this.Id = question.Id;
		this.Type = typeInfo[0].substr(0, typeInfo[0].indexOf("Question"));
		this.Version = typeInfo[1];
		//this.UserAnswer(question.UserAnswer);

		for (var i = 0; i < question.Data.length; i++)
		{
			var data = question.Data[i];
			var key = data.substring(1, data.indexOf(","));
			this.Data[key] = data.substring(key.length + 3, data.length - 1);
		}
			
		this.UserAnswer.subscribe(() => answerChangedCallback(this));
	}
}

export = Question;