import knockout = require("knockout");
import Routie = require("routie");
import NavigationPage = require("ViewModels/NavigationPage");
import ExperimentManager = require("ExperimentManager");

export var CurrentPage: KnockoutObservable<NavigationPage> = knockout.observable<NavigationPage>();

export function Initialize(): void
{
	Routie({
		"": () => { Navigate("Experiment/a12f"); },
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
	if(!ExperimentManager.ExperimentLoaded() && !ExperimentManager.ExperimentIsLoading())
		ExperimentManager.LoadExperiment(id);

	if (CurrentPage() == null || CurrentPage().Name() != "SlideShell")
		CurrentPage(new NavigationPage("SlideShell"));
}