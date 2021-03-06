﻿import ExperimentManager = require("Managers/Experiment");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class Header extends QuestionBase<any>
{
	constructor(question: QuestionModel)
	{
		super(question, false);

		var inputs = this.GetInputs();

		if (inputs.length === 0 || inputs[0].HeaderLabel == undefined) throw new Error("HeaderLabel not found for Header");

		ExperimentManager.SlideTitle(this.GetFormatted(inputs[0].HeaderLabel));
	}

	public SlideCompleted(): boolean
	{
		ExperimentManager.SlideTitle("");

		return false;
	}
}

export = Header;