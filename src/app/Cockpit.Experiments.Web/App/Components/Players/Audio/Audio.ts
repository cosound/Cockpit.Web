import knockout = require("knockout");
import jquery = require("jquery");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type Source = { Type: string; Source: string; };

class Audio
{
	public PlayerElement: KnockoutObservable<HTMLAudioElement> = knockout.observable<HTMLAudioElement>();
	public Sources: Source[];

	private _info: AudioInfo;

	constructor(info:AudioInfo)
	{
		this._info = info;

		this.Sources = this._info.Sources;

		var sub = this.PlayerElement.subscribe(e =>
		{
			sub.dispose();
			this.InitializePlayer(e);
		})
	}

	private InitializePlayer(player:HTMLAudioElement):void
	{
		jquery(player).on("playing", () =>
		{
			this._info.IsPlaying(true);
		}).on("pause", () =>
		{
			this._info.IsPlaying(true);
		});
	}
}

export = Audio;