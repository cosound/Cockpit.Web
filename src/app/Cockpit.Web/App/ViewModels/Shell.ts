/// <amd-dependency path="less!Styles/Shell" />
import Navigation = require("Navigation");
import AuthenticationManager = require("AuthenticationManager");
import Page = require("ViewModels/Page");

class Shell
{
	public Page: KnockoutObservable<Page>;
	public IsAuthenticated:KnockoutObservable<boolean>;

	constructor()
	{
		this.Page = Navigation.CurrentPage;
		this.IsAuthenticated = AuthenticationManager.IsAuthenticated;
	}
}

export = Shell;