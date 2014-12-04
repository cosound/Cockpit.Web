import knockout = require("knockout");
import Navigation = require("Managers/Navigation");
import NavigationPage = require("Managers/NavigationPage");

class Shell
{
	public Page:KnockoutObservable<NavigationPage>;

	constructor()
	{
		this.Page = Navigation.CurrentPage;

		Navigation.Initialize();
	}
}

export = Shell;