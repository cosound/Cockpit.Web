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

	public AddIsPlayingCallback(callback: (isPlaying: boolean) => void, onlyCallOnce:boolean = false)
	{
		var sub = this.IsPlaying.subscribe(v =>
		{
			if (onlyCallOnce) sub.dispose();
			callback(v);
		});
	}

	public static Create(stimulus:IStimulus):AudioInfo
	{
		if (stimulus === null) return null;
		return new AudioInfo([{ Type: stimulus.Type, Source: stimulus.URI }]);
	}
}

export = AudioInfo;