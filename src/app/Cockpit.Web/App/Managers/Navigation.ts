import knockout = require("knockout");
import Routie = require("routie");

export var CurrentPage: KnockoutObservable<{ Name: string; Data: any }> = knockout.observable<{ Name: string; Data: any }>();

export function Initialize(): void
{
	CurrentPage.extend({ rateLimit: 0 });

	Routie({
		""						: ()					=> { Navigate("Search"); },
		"Search"				: ()					=> { LoadPage("Search"); },
		"Search/:selectionId"	: (selectionId:string)	=> { LoadPage("Search", selectionId); },
		"Selections"			: ()					=> { LoadPage("Selections"); }
	});
}

export function Navigate(path: string): void
{
	Routie(path);
}

function LoadPage(name: string, data?: any): void
{
	CurrentPage({ Name: name, Data: data});
}