import knockout = require("knockout");
import Routie = require("routie");
import NavigationPage = require("ViewModels/NavigationPage");
import ExperimentManager = require("ExperimentManager");

export var CurrentPage: KnockoutObservable<NavigationPage> = knockout.observable<NavigationPage>();

export function Initialize(): void
{
	Routie({
		"": () => { Navigate("Experiment/7"); },
		"Experiment/:id": (id: string) => { LoadSlide(id, "0"); },
		"Experiment/:id/:slideId": (id: string, slideId: string) => { LoadSlide(id, slideId); },
		"*": () => { LoadPage("NotFound"); }
	});
}

export function Navigate(path: string): void
{
	Routie(path);
}

function LoadPage(name: string, data?:string): void
{
	CurrentPage(new NavigationPage(name, data));
}

function LoadSlide(id: string, slidId:string): void
{
	ExperimentManager.LoadExperiment(id);

	if (CurrentPage() == null || CurrentPage().Name() != "SlideShell")
		CurrentPage(new NavigationPage("SlideShell", slidId));
	else
		CurrentPage().Data(slidId);
}