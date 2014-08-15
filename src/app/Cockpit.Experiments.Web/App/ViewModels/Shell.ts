import knockout = require("knockout");
import Navigation = require("Navigation");
import NavigationPage = require("ViewModels/NavigationPage");

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