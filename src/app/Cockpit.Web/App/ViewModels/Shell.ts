/// <amd-dependency path="less!Styles/Shell" />
import Navigation = require("Navigation");
import Page = require("ViewModels/Page");

class Shell
{
	public Page: KnockoutObservable<Page>;

	constructor()
	{
		this.Page = Navigation.CurrentPage;
	}
}

export = Shell;