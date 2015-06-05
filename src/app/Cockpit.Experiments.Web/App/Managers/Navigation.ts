import knockout = require("knockout");
import Routie = require("routie");
import NavigationPage = require("Managers/NavigationPage");
import ExperimentManager = require("Managers/Experiment");
import CockpitPortal = require("CockpitPortal");

class Navigation
{
	public CurrentPage: KnockoutObservable<NavigationPage> = knockout.observable<NavigationPage>();

	constructor()
	{
		Routie({
			"": () => { this.LoadPage("Welcome"); },
			"Experiment/:id": (id: string) => { this.LoadSlide(id); },
			"ExperimentList/:id": (id: string) => { this.LoadExperimentFromList(id); },
			"NoMoreExperiments": () => { this.LoadPage("NoMoreExperiments"); },
			"SlideLocked": () => { this.LoadPage("SlideLocked"); },
			"TextFormat": () => { this.LoadPage("TextFormat"); },
			"ExperimentNotFound/:id": (id: string) => { this.LoadPage("ExperimentNotFound", id); },
			"*": () => { this.LoadPage("NotFound"); }
		});
	}

	public Navigate(path: string): void
	{
		Routie(path);
	}

	private LoadPage(name: string, data?:any): void
	{
		this.CurrentPage(new NavigationPage(name, data));
	}

	private LoadSlide(id: string): void
	{
		ExperimentManager.Load(id);

		if (this.CurrentPage() == null || this.CurrentPage().Name() !== "SlideShell")
			this.CurrentPage(new NavigationPage("SlideShell"));
	}

	private LoadExperimentFromList(id:string):void
	{
		CockpitPortal.Experiment.Next(id).WithCallback(response =>
		{
			if (response.Error != null)
			{
				this.Navigate("NoMoreExperiments");
				return;
			}

			if (response.Body.Results.length === 0)
				this.Navigate("NoMoreExperiments");
			else
				this.Navigate("Experiment/" + response.Body.Results[0].Id);
		});
	}
}

var instance = new Navigation();

export = instance;