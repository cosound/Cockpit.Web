import knockout = require("knockout");
import ExperimentManager = require("Managers/Experiment");
import SlideModel = require("Models/Slide");

class SlideShell
{
	public Title: KnockoutObservable<string>;
	public SlideName: KnockoutObservable<string>;
	public HasTitle: KnockoutComputed<boolean>;

	public SlideData: KnockoutObservable<SlideModel> = knockout.observable<SlideModel>();

	public SlideIndex:KnockoutObservable<number>;
	public SlideNumber:KnockoutComputed<number>;
	public NumberOfSlides: KnockoutObservable<number>;
	public CanGoToNextSlide: KnockoutObservable<boolean> = knockout.observable<boolean>(false);
	public CanGoToPreviousSlide: KnockoutObservable<boolean> = knockout.observable<boolean>(true);
	public AreFooterControlsVisible: KnockoutObservable<boolean> = knockout.observable<boolean>(true);
	public IsLoadingSlide: KnockoutComputed<boolean>;

	private _experimentMangerIsReadySubscription: KnockoutSubscription;

	constructor()
	{
		this.SlideIndex = ExperimentManager.CurrentSlideIndex;
		this.SlideNumber = knockout.computed(() => this.SlideIndex() + 1);
		this.IsLoadingSlide = knockout.computed(() => this.SlideData() == null);
		this.NumberOfSlides = ExperimentManager.NumberOfSlides;
		this.CanGoToPreviousSlide = ExperimentManager.EnablePrevious;

		this.Title = ExperimentManager.Title;
		this.SlideName = ExperimentManager.SlideName;
		this.HasTitle = knockout.computed(() => this.Title() !== "");

		this._experimentMangerIsReadySubscription = ExperimentManager.IsReady.subscribe(r =>
		{
			if (!r) return;

			this.CleanExperimentLoaded();
			this.GoToNextSlide();
		});

		if (ExperimentManager.IsReady()) this.GoToNextSlide();
	}

	public GoToNextSlide():void
	{
		this.CanGoToNextSlide(false);

		var slideIndex = this.SlideIndex();

		if (this.SlideData() != null)
		{
			var oldSlide = this.SlideData();
			this.SlideData().Complete(() => ExperimentManager.CloseSlide(oldSlide.Index));
		}

		this.SlideData(null);

		if (slideIndex + 1 < this.NumberOfSlides() || this.NumberOfSlides() === 0)
			ExperimentManager.LoadNextSlide((index, questions) => this.SlideData(new SlideModel("Slides/Default", index, this.CanGoToNextSlide, questions)));
		else
		{
			this.AreFooterControlsVisible(false);
			this.SlideData(new SlideModel("Slides/Completed"));
		}
	}

	public GoToPreviousSlide():void
	{
		if (this.SlideIndex() === 0 || !ExperimentManager.EnablePrevious()) return;

		ExperimentManager.LoadSlide(this.SlideIndex() - 1, (index, questions) => this.SlideData(new SlideModel("Slides/Default", index, this.CanGoToNextSlide, questions)));
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