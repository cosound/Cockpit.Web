import knockout = require("knockout");
import ExperimentManager = require("ExperimentManager");
import CockpitPortal = require("CockpitPortal");
import NavigationPage = require("ViewModels/NavigationPage");
import Navigation = require("Navigation");
import SlideModel = require("Models/Slide");

class SlideShell
{
	public Name: KnockoutObservable<string> = knockout.observable<string>();

	public SlideData: KnockoutObservable<SlideModel> = knockout.observable<SlideModel>();

	public SlideIndex:KnockoutObservable<number> = knockout.observable<number>(0);
	public SlideNumber:KnockoutComputed<number>;
	public NumberOfSlides: KnockoutObservable<number>;
	public CanGoToNextSlide: KnockoutObservable<boolean> = knockout.observable<boolean>(false);
	public AreFooterControlsVisible: KnockoutObservable<boolean> = knockout.observable<boolean>(true);
	public IsLoadingSlide: KnockoutComputed<boolean>;

	private _experimentMangerIsReadySubscription: KnockoutSubscription;

	constructor()
	{
		this.SlideNumber = knockout.computed(() => this.SlideIndex() + 1);
		this.IsLoadingSlide = knockout.computed(() => this.SlideData() == null);
		this.NumberOfSlides = ExperimentManager.NumberOfSlides;

		this.Name("My Experiment");

		if (ExperimentManager.IsReady())
			this.LoadSlide(0);
		else
		{
			this._experimentMangerIsReadySubscription = ExperimentManager.IsReady.subscribe(l =>
			{
				this.CleanExperimentLoaded();
				this.LoadSlide(0);
			});
		}
	}

	public GoToNextSlide():void
	{
		this.CanGoToNextSlide(false);

		this.LoadSlide(this.SlideIndex() + 1);
	}

	private LoadSlide(index:number):void
	{
		this.SlideIndex(index);
		this.SlideData(null);

		if (index < this.NumberOfSlides() || index == 0)
			ExperimentManager.LoadSlide(this.SlideIndex(), questions => this.SlideData(new SlideModel("Slides/Default", this.CanGoToNextSlide, questions)));
		else
		{
			this.AreFooterControlsVisible(false);
			this.SlideData(new SlideModel("Slides/Completed"));
		}
	}

	private CleanExperimentLoaded():void
	{
		this._experimentMangerIsReadySubscription.dispose();
		this._experimentMangerIsReadySubscription = null;
	}

	public dispose():void
	{
		if (this._experimentMangerIsReadySubscription)
			this.CleanExperimentLoaded();
	}
}

export = SlideShell;