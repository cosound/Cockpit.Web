import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");

class Slide
{
	public Name:string;
	public CanGoToNextSlide:KnockoutObservable<boolean>;
	public Questions:CockpitPortal.IQuestion[];
	public SlideCompleted:()=>void;

	constructor(name: string, canGoToNextSlide: KnockoutObservable<boolean> = null, questions:CockpitPortal.IQuestion[] = null)
	{
		this.Name = name;
		this.CanGoToNextSlide = canGoToNextSlide;
		this.Questions = questions;
	}

	public Complete():void
	{
		if (this.SlideCompleted != null) this.SlideCompleted();
	}
}

export = Slide;