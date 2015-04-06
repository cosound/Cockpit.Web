import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import QuestionMap = require("Components/Questions/QuestionMap");

class Question
{
	public Id: string;
	public Type: string;
	public APIType:string;
	public HasUIElement: boolean;
	public Input: any[];
	public Answer: KnockoutObservable<any> = knockout.observable<any>();
	public RequiresInput:boolean;

	constructor(question: CockpitPortal.IQuestion, answerChangedCallback: (question: Question)=>void)
	{
		var questionMap = QuestionMap.Get(question.Type);
		this.Id = question.Id;
		this.Type = questionMap.Type;
		this.HasUIElement = questionMap.HasUIElement;
		this.APIType = question.Type;

		if (question.Output)
			this.Answer(question.Output);

		this.Input = question.Input;

		this.Answer.extend({ rateLimit: { timeout: 200, method: "notifyWhenChangesStop" } });
		this.Answer.subscribe(() => answerChangedCallback(this));
	}
}

export = Question;