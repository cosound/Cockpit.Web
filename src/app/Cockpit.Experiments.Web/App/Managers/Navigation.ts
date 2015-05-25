import knockout = require("knockout");
import Routie = require("routie");
import NavigationPage = require("Managers/NavigationPage");
import ExperimentManager = require("Managers/Experiment");
import CockpitPortal = require("CockpitPortal");

export var CurrentPage: KnockoutObservable<NavigationPage> = knockout.observable<NavigationPage>();

export function Initialize(): void
{
	Routie({
		"": () => { LoadPage("Welcome"); },
		"Experiment/:id": (id: string) => { LoadSlide(id); },
		"ExperimentList/:id": (id: string) => { LoadExperimentFromList(id); },
		"NoMoreExperiments": () => { LoadPage("NoMoreExperiments"); },
		"SlideLocked": () => { LoadPage("SlideLocked"); },
		"TextFormat": () => { LoadPage("TextFormat"); },
		"ExperimentNotFound/:id": (id: string) => { LoadPage("ExperimentNotFound", id); },
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
	ExperimentManager.SetId(id);

	if (CurrentPage() == null || CurrentPage().Name() !== "SlideShell")
		CurrentPage(new NavigationPage("SlideShell"));
}

function LoadExperimentFromList(id:string):void
{
	CockpitPortal.Experiment.Next(id).WithCallback(response =>
	{
		if (response.Error != null)
		{
			Navigate("NoMoreExperiments");
			return;
		}

		if (response.Body.Results.length === 0)
			Navigate("NoMoreExperiments");
		else
			Navigate("Experiment/" + response.Body.Results[0].Id);
	});
}