import knockout = require("knockout");

class AudioRating
{
	public StreamUrl:KnockoutObservable<string> = knockout.observable<string>();
	public RatingLabel: KnockoutObservable<string> = knockout.observable<string>();

	public Value:KnockoutObservable<number> = knockout.observable(0.5);

	private _canGoToNextSlide: KnockoutObservable<boolean>;
	private _ValueSubscription:KnockoutSubscription;

	constructor(data: any)
	{
		var slide = <ISlideAudioRating>data.Slide;

		this._canGoToNextSlide = data.CanGoToNextSlide;

		this.StreamUrl(slide.StreamUrl);
		this.RatingLabel(slide.RatingLabel);

		this._ValueSubscription = this.Value.subscribe(v => this._canGoToNextSlide(true));
	}

	public dispose():void
	{
		this._ValueSubscription.dispose();
		this._ValueSubscription = null;
	}
}

export = AudioRating;