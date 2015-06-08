import ExperimentManager = require("Managers/Experiment");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class EndOfExperiment extends QuestionBase
{
	constructor(question: QuestionModel)
	{
		super(question, false);

		ExperimentManager.ExperimentCompleted();
	}
}

export = EndOfExperiment;