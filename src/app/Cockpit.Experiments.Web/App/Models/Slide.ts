import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");

class Slide
{
	public Name:string;
	public CanGoToNextSlide:KnockoutObservable<boolean>;
	public Questions:CockpitPortal.IQuestion[];

	constructor(name: string, canGoToNextSlide: KnockoutObservable<boolean> = null, questions:CockpitPortal.IQuestion[] = null)
	{
		this.Name = name;
		this.CanGoToNextSlide = canGoToNextSlide;
		this.Questions = questions;
	}
}

export = Slide;