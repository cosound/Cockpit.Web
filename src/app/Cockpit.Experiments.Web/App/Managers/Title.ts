import knockout = require("knockout");

class Title
{
	public Title: KnockoutObservable<string>;
	private isDefault: boolean = true;
	private static defaultName: string = "Cockpit";

	constructor()
	{
		this.Title = knockout.observable(Title.defaultName);
		this.Title.subscribe(v =>
		{
			document.title = v;
			this.isDefault = false;
		});
	}

	public ToDefault(subName: string = null): void
	{
		this.Title((subName == null ? "" : subName + " - ") + Title.defaultName);
		this.isDefault = true;
	}
}

var instance = new Title();

export = instance;