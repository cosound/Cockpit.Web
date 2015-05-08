import knockout = require("knockout");
import jquery = require("jquery");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type Source = { Type: string; Source: string; };

class Audio
{
	public PlayerElement: KnockoutObservable<HTMLAudioElement> = knockout.observable<HTMLAudioElement>();
	public Sources: Source[];
	public IsPlaying: KnockoutObservable<boolean>;

	private _info: AudioInfo;
	private static _activePlayer:Audio = null;


	constructor(info:AudioInfo)
	{
		this._info = info;
		this.IsPlaying = this._info.IsPlaying;

		this.Sources = this._info.Sources;

		var sub = this.PlayerElement.subscribe(e =>
		{
			sub.dispose();
			this.InitializePlayer(e);
		});
	}

	public TogglePlay():void
	{
		if (this.IsPlaying())
		{
			Audio._activePlayer = null;
			this.PlayerElement().pause();
		}
		else
		{
			if (Audio._activePlayer !== null && Audio._activePlayer !== this)
				Audio._activePlayer.TogglePlay();

			Audio._activePlayer = this;
			this.PlayerElement().play();
		}
			
	}

	private InitializePlayer(player:HTMLAudioElement):void
	{
		var $player = jquery(player);

		$player.on("playing", () =>
		{
			this._info.IsPlaying(true);
		}).on("pause", () =>
		{
			this._info.IsPlaying(false);
		});

		this.Sources.forEach(s => $player.append(`<Source type="${s.Type}" src="${s.Source}"/>`));
	}
}

export = Audio;