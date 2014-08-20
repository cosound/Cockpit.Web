import knockout = require("knockout");

class Intro
{
	public Text: KnockoutObservable<string> = knockout.observable<string>();

	constructor(data:any)
	{
		var slide = <ISlideIntro>data.Slide;
		
		this.Text(slide.Text);

		data.CanGoToNextSlide(true);
	}
}

export = Intro;