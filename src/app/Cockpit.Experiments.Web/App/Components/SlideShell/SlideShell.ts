import knockout = require("knockout");
import Configuration = require("Configuration");
import ExperimentManager = require("Managers/Experiment");
import SlideModel = require("Models/Slide");

class SlideShell
{
	public Title: KnockoutObservable<string> = knockout.observable<string>();
	public SlideName: KnockoutObservable<string> = knockout.observable<string>();
	public HasTitle: KnockoutComputed<boolean>;

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

		this.Title(Configuration.ExperimentTitle);
		this.SlideName(Configuration.SlideName);
		this.HasTitle = knockout.computed(() => this.Title() !== "");

		this._experimentMangerIsReadySubscription = ExperimentManager.IsReady.subscribe(r =>
		{
			if (!r) return;

			this.CleanExperimentLoaded();
			this.LoadSlide(0);
		});

		if (ExperimentManager.IsReady()) this.LoadSlide(0);
	}

	public GoToNextSlide():void
	{
		this.CanGoToNextSlide(false);

		var slideIndex = this.SlideIndex();

		this.LoadSlide(slideIndex + 1);

		if (Configuration.CloseSlides)
			ExperimentManager.CloseSlide(slideIndex);
	}

	private LoadSlide(index:number):void
	{
		this.SlideIndex(index);

		if (this.SlideData() != null)
		{
			var oldSlide = this.SlideData();
			this.SlideData().Complete(() =>
			{
				if (Configuration.CloseSlides && oldSlide.Index != null)
					ExperimentManager.CloseSlide(oldSlide.Index);
			});
		}
		this.SlideData(null);

		if (index < this.NumberOfSlides() || index === 0)
			ExperimentManager.LoadSlide(this.SlideIndex(), questions => this.SlideData(new SlideModel("Slides/Default", index, this.CanGoToNextSlide, questions)));
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