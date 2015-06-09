import knockout = require("knockout");
import ExperimentManager = require("Managers/Experiment");
import SlideModel = require("Models/Slide");

class SlideShell
{
	public Title: KnockoutObservable<string>;
	public SlideName: KnockoutObservable<string>;
	public HasTitle: KnockoutComputed<boolean>;

	public SlideData: KnockoutObservable<SlideModel> = knockout.observable<SlideModel>();

	public AreAllQuestionsAnswered:KnockoutObservable<boolean> = knockout.observable(false);
	public SlideIndex:KnockoutObservable<number>;
	public SlideNumber:KnockoutComputed<number>;
	public NumberOfSlides: KnockoutObservable<number>;

	public IsLoadingSlide: KnockoutComputed<boolean>;

	public IsPreviousSlideVisible: KnockoutComputed<boolean>;
	public IsPreviousSlideEnabled:KnockoutComputed<boolean>;
	public IsNextSlideVisible: KnockoutComputed<boolean>;
	public IsNextSlideEnabled: KnockoutComputed<boolean>;
	public IsCloseExperimentVisible: KnockoutComputed<boolean>;

	private _experimentMangerIsReadySubscription: KnockoutSubscription;

	constructor()
	{
		this.IsLoadingSlide = knockout.computed(() => this.SlideData() == null);
		this.SlideIndex = ExperimentManager.CurrentSlideIndex;
		this.SlideNumber = knockout.computed(() => this.SlideIndex() + 1);
		this.NumberOfSlides = ExperimentManager.NumberOfSlides;

		this.IsPreviousSlideVisible = knockout.computed(() => ExperimentManager.GoToPreviousSlideEnabled() && !ExperimentManager.CloseSlidesEnabled());
		this.IsPreviousSlideEnabled = knockout.computed(() => this.IsPreviousSlideVisible() && !this.IsLoadingSlide() && this.SlideIndex() !== 0);
		this.IsNextSlideVisible = knockout.computed(() => true);
		this.IsNextSlideEnabled = knockout.computed(() => this.IsNextSlideVisible() && !this.IsLoadingSlide() && this.AreAllQuestionsAnswered() && this.SlideNumber() !== this.NumberOfSlides());
		this.IsCloseExperimentVisible = knockout.computed(() => ExperimentManager.IsExperimentCompleted() && ExperimentManager.CloseExperimentEnabled());

		this.Title = ExperimentManager.Title;
		this.SlideName = ExperimentManager.SlideName;
		this.HasTitle = knockout.computed(() => this.Title() !== "");

		this._experimentMangerIsReadySubscription = ExperimentManager.IsReady.subscribe(r =>
		{
			if (!r) return;

			this.GoToNextSlide();
		});

		if (ExperimentManager.IsReady()) this.GoToNextSlide();
	}

	public GoToNextSlide():void
	{
		if (this.SlideData() != null)
		{
			var oldSlide = this.SlideData();
			this.SlideData().Complete(() => ExperimentManager.CloseSlide(oldSlide.Index));
		}

		this.SlideData(null);

		ExperimentManager.LoadNextSlide((index, questions) => this.SlideData(new SlideModel("Slides/Default", index, this.AreAllQuestionsAnswered, questions)));
	}

	public GoToPreviousSlide():void
	{
		this.SlideData(null);

		ExperimentManager.LoadPreviousSlide((index, questions) => this.SlideData(new SlideModel("Slides/Default", index, this.AreAllQuestionsAnswered, questions)));
	}

	public Close():void
	{
		ExperimentManager.Close();
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