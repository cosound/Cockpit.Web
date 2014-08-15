import knockout = require("knockout");
import ExperimentManager = require("ExperimentManager");

class Intro
{
	public Text:KnockoutObservable<string> = knockout.observable<string>();

	constructor(id:string)
	{
		var slide = <ISlideIntro>ExperimentManager.Experiment().Slides[parseInt(id)];
		this.Text(slide.Text);
	}
}

export = Intro;