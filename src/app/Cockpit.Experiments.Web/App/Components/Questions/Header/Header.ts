import ExperimentManager = require("Managers/Experiment");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class Header extends QuestionBase
{
	constructor(question: QuestionModel)
	{
		super(question, false);

		ExperimentManager.Title(this.GetFormatted(this.Model.Input[0].HeaderLabel));
	}

	public SlideCompleted(): boolean
	{
		ExperimentManager.Title("");

		return false;
	}
}

export = Header;