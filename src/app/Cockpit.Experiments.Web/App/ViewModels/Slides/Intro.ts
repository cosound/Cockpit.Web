import knockout = require("knockout");
import ExperimentManager = require("ExperimentManager");
import Navigation = require("Navigation");

class Intro
{
	public Text: KnockoutObservable<string> = knockout.observable<string>();

	private _id: number;

	constructor(id: string)
	{
		this._id = parseInt(id);

		var slide = <ISlideIntro>ExperimentManager.Experiment().Slides[this._id];
		this.Text(slide.Text);
	}

	public NextSlide()
	{
		Navigation.Navigate("Experiment/7/" + (this._id + 1));
	}
}

export = Intro;