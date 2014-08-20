import knockout = require("knockout");

class ThankYou
{
	public Text:KnockoutObservable<string> = knockout.observable<string>();

	constructor(data: any)
	{
		var slide = <ISlideThankYou>data.Slide;

		this.Text(slide.Text);
	}
}

export = ThankYou;