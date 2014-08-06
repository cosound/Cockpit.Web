import knockout = require("knockout");
import Routie = require("routie");
import AuthenticationManager = require("AuthenticationManager");
import Page = require("ViewModels/Page");

var goToAfterAuthentication:Page;

export var CurrentPage: KnockoutObservable<Page> = knockout.observable<Page>();

export function Initialize(): void
{
	Routie({
		"": () => { LoadPage("Login", false); },
		"Search": () => { LoadPage("Search"); },
		"Selections": () => { LoadPage("Selections"); },
		"*": () => { LoadPage("NotFound"); }
	});

	AuthenticationManager.IsAuthenticated.subscribe(newValue => IsAuthenticatedChanged(newValue));
}

export function Navigate(path: string): void
{
	Routie(path);
}

function LoadPage(name: string, requiresAuthentication: boolean = true): void
{
	var page = new Page(name + "/" + name);

	if (requiresAuthentication && !AuthenticationManager.IsAuthenticated())
	{
		goToAfterAuthentication = page;
		page = new Page("Login/Login");
	}
	else
		goToAfterAuthentication = null;

	CurrentPage(page);
}

function IsAuthenticatedChanged(isAuthenticated:boolean):void
{
	if (isAuthenticated)
	{
		if (goToAfterAuthentication)
		{
			CurrentPage(goToAfterAuthentication);
			goToAfterAuthentication = null;
		} else
			Navigate("Search");
	} else
		Navigate("");
}