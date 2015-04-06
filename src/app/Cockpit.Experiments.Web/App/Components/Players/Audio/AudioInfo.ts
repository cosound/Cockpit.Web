import knockout = require("knockout");

type Source = {Type:string; Source:string;};

class AudioInfo
{
	public Sources: Source[];
	public IsPlaying: KnockoutObservable<boolean> = knockout.observable(false);

	constructor(sources:Source[])
	{
		this.Sources = sources;
	}

	public AddIsPlayingCallback(callback: (isPlaying: boolean) => void)
	{
		this.IsPlaying.subscribe(v => callback(v));
	}
}

export = AudioInfo;