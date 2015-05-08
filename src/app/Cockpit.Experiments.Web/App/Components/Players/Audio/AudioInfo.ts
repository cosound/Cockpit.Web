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

	public static Create(stimulus:Stimulus):AudioInfo
	{
		if (stimulus === null) return null;
		return new AudioInfo([{ Type: stimulus.Type, Source: stimulus.URI }]);
	}
}

export = AudioInfo;