import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import QuestionData = require("Models/QuestionData");

class QuestionsBase<T extends CockpitPortal.IQuestion>
{
	private _slideData: QuestionData;
	public Data: T;
	public UserInput:KnockoutObservable<string>;

	constructor(questionData: QuestionData)
	{
		this._slideData = questionData;
		this.Data = <T>questionData.Data;
		this.UserInput = this._slideData.UserInput;

		this.Initialize();
	}

	public Initialize():void
	{
		throw new Error("Not implemented");
	}
}

export = QuestionsBase;