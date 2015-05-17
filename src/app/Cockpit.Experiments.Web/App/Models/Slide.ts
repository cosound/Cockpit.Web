import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");

class Slide
{
	public Index:number;
	public Name:string;
	public CanGoToNextSlide:KnockoutObservable<boolean>;
	public Questions:CockpitPortal.IQuestion[];
	public SlideCompleted: (completed: () => void) => void;

	constructor(name: string, index: number = null, canGoToNextSlide: KnockoutObservable<boolean> = null, questions:CockpitPortal.IQuestion[] = null)
	{
		this.Index = index;
		this.Name = name;
		this.CanGoToNextSlide = canGoToNextSlide;
		this.Questions = questions;
	}

	public Complete(callback:()=>void):void
	{
		if (this.SlideCompleted != null) this.SlideCompleted(callback);
	}
}

export = Slide;