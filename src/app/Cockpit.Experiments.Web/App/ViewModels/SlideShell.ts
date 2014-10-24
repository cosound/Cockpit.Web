import knockout = require("knockout");
import ExperimentManager = require("ExperimentManager");
import CockpitPortal = require("CockpitPortal");
import NavigationPage = require("ViewModels/NavigationPage");
import Navigation = require("Navigation");
import SlideData = require("Models/SlideData");

class SlideShell
{
	public Name: KnockoutObservable<string> = knockout.observable<string>();

	public SlideData: KnockoutObservable<SlideData> = knockout.observable<SlideData>();

	public SlideIndex:KnockoutObservable<number> = knockout.observable<number>(0);
	public SlideNumber:KnockoutComputed<number>;
	public NumberOfSlides: KnockoutObservable<number> = knockout.observable<number>(0);
	public CanGoToNextSlide: KnockoutObservable<boolean> = knockout.observable<boolean>(false);
	public AreFooterControlsVisible: KnockoutObservable<boolean> = knockout.observable<boolean>(true);

	private _experimentLoadedSubscription: KnockoutSubscription;

	private _experiment:CockpitPortal.IQuestionnaire;

	constructor()
	{
		this.SlideNumber = knockout.computed(() => this.SlideIndex() + 1);

		if (ExperimentManager.ExperimentLoaded())
			this.LoadExperiment();
		else
		{
			this._experimentLoadedSubscription = ExperimentManager.ExperimentLoaded.subscribe(l =>
			{
				this.CleanExperimentLoaded();
				this.LoadExperiment();
			});
		}
	}

	public GoToNextSlide():void
	{
		this.CanGoToNextSlide(false);

		ExperimentManager.SaveSlideData(this.SlideIndex(), this.SlideData().UserInput);

		this.LoadSlide(this.SlideIndex() + 1);
	}

	private LoadExperiment():void
	{
		this._experiment = ExperimentManager.Experiment();
		this.Name(this._experiment.Name);
		this.NumberOfSlides(this._experiment.Slides.length);
		this.LoadSlide(0);
	}

	private LoadSlide(index:number):void
	{
		this.SlideIndex(index);

		if (index < this._experiment.Slides.length)
			this.SlideData(new SlideData("Slides/Default", this.CanGoToNextSlide, this._experiment.Slides[index]));
		else
		{
			this.AreFooterControlsVisible(false);
			this.SlideData(new SlideData("Slides/Completed"));
		}
	}

	private CleanExperimentLoaded():void
	{
		this._experimentLoadedSubscription.dispose();
		this._experimentLoadedSubscription = null;
	}

	public dispose():void
	{
		if (this._experimentLoadedSubscription)
			this.CleanExperimentLoaded();
	}
}

export = SlideShell;