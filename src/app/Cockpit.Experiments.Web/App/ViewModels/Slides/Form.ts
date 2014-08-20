import knockout = require("knockout");
import ExperimentManager = require("ExperimentManager");
import Navigation = require("Navigation");

class Intro
{
	public Inputs: IInput[];

	constructor(data: any)
	{
		var slide = <ISlideForm>data.Slide;

		this.Inputs = slide.Inputs;
	}

	public NextSlide()
	{
		//data.CanGoToNextSlide(true);
	}
}

export = Intro;