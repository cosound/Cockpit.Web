import knockout = require("knockout");
import ExperimentManager = require("ExperimentManager");
import Navigation = require("Navigation");

class Intro
{
	public Inputs: IInput[];

	private _id: number;

	constructor(id: string)
	{
		this._id = parseInt(id);

		var slide = <ISlideForm>ExperimentManager.Experiment().Slides[this._id];
		this.Inputs = slide.Inputs;
	}

	public NextSlide()
	{
		
	}
}

export = Intro;