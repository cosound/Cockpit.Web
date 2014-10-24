import CockpitPortal = require("CockpitPortal");
import QuestionData = require("Models/QuestionData");

class QuestionsBase<T extends CockpitPortal.IQuestion>
{
	private _slideData: QuestionData;
	public Data:T;

	constructor(questionData: QuestionData)
	{
		this._slideData = questionData;
		this.Data = <T>questionData.Data;

		this.Initialize();
	}

	public Initialize():void
	{
		throw new Error("Not implemented");
	}
}

export = QuestionsBase;