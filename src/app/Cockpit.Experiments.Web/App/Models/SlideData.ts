import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");

class SlideData
{
	public Name:string;
	public CanGoToNextSlide:KnockoutObservable<boolean>;
	public Data: CockpitPortal.ISlide;
	public UserInput: any;

	constructor(name: string, canGoToNextSlide: KnockoutObservable<boolean> = null, data:CockpitPortal.ISlide = null)
	{
		this.Name = name;
		this.CanGoToNextSlide = canGoToNextSlide;
		this.Data = data;
	}
}

export = SlideData;