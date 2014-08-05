import knockout = require("knockout");
import Routie = require("routie");
import AuthorizationManager = require("AuthorizationManager");
import Page = require("ViewModels/Page");

export var CurrentPage: KnockoutObservable<Page> = knockout.observable<Page>();

export function Initialize(): void
{
	Routie({
		"": () => { LoadPage("Login"); },
		"Search": () => { LoadPage("Search"); },
		"Selections": () => { LoadPage("Selections"); },
		"*": () => { LoadPage("NotFound"); }
	});

	AuthorizationManager.IsAuthenticated.subscribe(newValue => IsAuthenticatedChanged(newValue));
}

export function Navigate(path: string): void
{
	Routie(path);
}

function LoadPage(name: string): void
{
	CurrentPage(new Page(name + "/" + name));
}

function IsAuthenticatedChanged(isAuthenticated:boolean):void
{
	Navigate(isAuthenticated ? "Search" : "");
}