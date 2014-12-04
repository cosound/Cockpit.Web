import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import Answer = require("Models/Answer");
import QuestionMap = require("Components/Questions/QuestionMap");

class Question
{
	public Id: string;
	public Type: string;
	public APIType:string;
	public HasUIElement: boolean;
	public Data: {[key:string]:any} = {};
	public UserAnswer: KnockoutObservable<Answer> = knockout.observable<Answer>();
	public RequiresInput:boolean;

	constructor(question: CockpitPortal.IQuestion, answerChangedCallback: (question: Question)=>void)
	{
		var questionMap = QuestionMap.Get(question.Type);

		this.Id = question.Id;
		this.Type = questionMap.Type;
		this.HasUIElement = questionMap.HasUIElement;
		this.APIType = question.Type;
		
		if (question.UserAnswer)
			this.UserAnswer(new Answer(question.Id, question.UserAnswer.Data));

		if (question.Data)
			this.Data = question.Data;
			
		this.UserAnswer.subscribe(() => answerChangedCallback(this));
	}
}

export = Question;