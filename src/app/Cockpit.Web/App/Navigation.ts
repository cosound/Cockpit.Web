import knockout = require("knockout");
import Routie = require("routie");
import AuthenticationManager = require("AuthenticationManager");
import Page = require("ViewModels/Page");

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
	if (requiresAuthentication && AuthenticationManager.IsAuthenticated())

	CurrentPage(new Page(name + "/" + name));
}

function IsAuthenticatedChanged(isAuthenticated:boolean):void
{
	Navigate(isAuthenticated ? "Search" : "");
}