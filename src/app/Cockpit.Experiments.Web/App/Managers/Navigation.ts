import knockout = require("knockout");
import Routie = require("routie");
import NavigationPage = require("Managers/NavigationPage");
import ExperimentManager = require("Managers/Experiment");

export var CurrentPage: KnockoutObservable<NavigationPage> = knockout.observable<NavigationPage>();

export function Initialize(): void
{
	Routie({
		"": () => { Navigate("Experiment/ea3976c7-2d4a-4ef0-84a1-1d9e66f4a0e7"); },
		"Experiment/:id": (id: string) => { LoadSlide(id); },
		"*": () => { LoadPage("NotFound"); }
	});
}

export function Navigate(path: string): void
{
	Routie(path);
}

function LoadPage(name: string, data?:any): void
{
	CurrentPage(new NavigationPage(name, data));
}

function LoadSlide(id: string): void
{
	if(!ExperimentManager.IsReady())
		ExperimentManager.SetId(id);

	if (CurrentPage() == null || CurrentPage().Name() != "SlideShell")
		CurrentPage(new NavigationPage("SlideShell"));
}