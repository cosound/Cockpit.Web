import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import Answer = require("Models/Answer");
import QuestionMap = require("QuestionMap");

class Question
{
	public Id: string;
	public Type: string;
	public HasUIElement: boolean;
	public Data: {[key:string]:string} = {};
	public UserAnswer: KnockoutObservable<Answer> = knockout.observable<Answer>();

	constructor(question: CockpitPortal.IQuestion, answerChangedCallback: (question: Question)=>void)
	{
		var questionMap = QuestionMap.Map[question.Type];

		if (!questionMap) throw new Error("Question map for " + question.Type + " not found");

		this.Id = question.Id;
		this.Type = questionMap.Type;
		this.HasUIElement = questionMap.HasUIElement;
		
		//this.UserAnswer(question.UserAnswer);

		if (question.Data)
		{
			for (var i = 0; i < question.Data.length; i++)
			{
				var data = question.Data[i];
				var key = data.substring(1, data.indexOf(","));
				this.Data[key] = data.substring(key.length + 3, data.length - 1);
			}
		}
			
		this.UserAnswer.subscribe(() => answerChangedCallback(this));
	}
}

export = Question;