import knockout = require("knockout");
import ExperimentManager = require("ExperimentManager");
import NavigationPage = require("ViewModels/NavigationPage");

class SlideShell
{
	public Slide: KnockoutObservable<NavigationPage> = knockout.observable < NavigationPage>();

	 constructor(slideId:string)
	 {
		 if (ExperimentManager.ExperimentLoaded())
			 this.LoadSlide(parseInt(slideId));
		 else
			 ExperimentManager.ExperimentLoaded.subscribe(l => this.LoadSlide(parseInt(slideId)));
	 }

	private LoadSlide(id:number):void
	{
		var slide = ExperimentManager.Experiment().Slides[id];

		this.Slide(new NavigationPage("Slides/" + slide.Type, id.toString()));
	}
}

 export = SlideShell;