import CockpitPortal = require("CockpitPortal");

class SlideData
{
	Name:string;
	CanGoToNextSlide:()=>void;
	Data: CockpitPortal.ISlide;
	UserInput: any;

	constructor(name: string, canGoToNextSlide:()=>void = null, data:CockpitPortal.ISlide = null)
	{
		this.Name = name;
		this.CanGoToNextSlide = canGoToNextSlide;
		this.Data = data;
	}
}

export = SlideData;