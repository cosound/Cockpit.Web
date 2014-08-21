import knockout = require("knockout");

class AudioRating
{
	public Configuration: ISlideAudioRating;

	public Value:KnockoutObservable<number> = knockout.observable(0.5);

	private _canGoToNextSlide: KnockoutObservable<boolean>;
	private _valueSubscription:KnockoutSubscription;

	constructor(data: any)
	{
		this.Configuration = <ISlideAudioRating>data.Slide;

		this._canGoToNextSlide = data.CanGoToNextSlide;

		this._valueSubscription = this.Value.subscribe(v =>
		{
			data.UserInput(v);
			this._canGoToNextSlide(true);
		});
	}

	public dispose():void
	{
		this._valueSubscription.dispose();
		this._valueSubscription = null;
	}
}

export = AudioRating;