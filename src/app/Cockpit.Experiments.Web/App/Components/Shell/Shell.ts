import knockout = require("knockout");
import Configuration = require("Configuration");
import Navigation = require("Managers/Navigation");
import NavigationPage = require("Managers/NavigationPage");

class Shell
{
	public Page: KnockoutObservable<NavigationPage>;
	public IsPoweredByCockpitVisible:boolean;

	constructor()
	{
		this.Page = Navigation.CurrentPage;
		this.IsPoweredByCockpitVisible = Configuration.IsPoweredByCockpitVisible;

		Navigation.Initialize();
	}
}

export = Shell;