import knockout = require("knockout");
import jquery = require("jquery");
import AudioInfo = require("Components/Players/Audio/AudioInfo");

type Source = { Type: string; Source: string; };

class Audio
{
	public Element: KnockoutObservable<HTMLAudioElement> = knockout.observable<HTMLAudioElement>();
	public Sources: Source[];

	private _info:AudioInfo;

	constructor(info:AudioInfo)
	{
		this._info = info;

		this.Sources = this._info.Sources;
	}
}

export = Audio;