import knockout = require("knockout");
import Routie = require("routie");
import NavigationPage = require("Managers/NavigationPage");

class Navigation
{
	public CurrentPage: KnockoutObservable<NavigationPage> = knockout.observable<NavigationPage>();
	public ExperimentId:KnockoutObservable<string> = knockout.observable(null);
	public ExperimentListId:KnockoutObservable<string> = knockout.observable(null);

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
		this.ExperimentId(id);

		if (this.CurrentPage() == null || this.CurrentPage().Name() !== "SlideShell")
			this.CurrentPage(new NavigationPage("SlideShell"));
	}

	private LoadExperimentFromList(id:string):void
	{
		this.ExperimentId(null);
		this.ExperimentListId(id);
	}
}

var instance = new Navigation();

export = instance;