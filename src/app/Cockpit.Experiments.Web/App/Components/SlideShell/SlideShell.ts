import knockout = require("knockout");
import ExperimentManager = require("Managers/Experiment");
import SlideModel = require("Models/Slide");

class SlideShell
{
	public Title: KnockoutObservable<string>;
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
	public IsCloseExperimentEnabled: KnockoutComputed<boolean>;
	public IsHighlighted: KnockoutObservable<boolean> = knockout.observable(false);
	public IsWaiting: KnockoutComputed<boolean>;
	public IsWaitingForNext: KnockoutObservable<boolean> = knockout.observable(false);

	private _subscriptions:KnockoutSubscription[] = [];

	constructor()
	{
		this.IsLoadingSlide = knockout.computed(() => this.SlideData() == null);
		this.SlideIndex = ExperimentManager.CurrentSlideIndex;
		this.SlideNumber = knockout.computed(() => this.SlideIndex() + 1);
		this.NumberOfSlides = ExperimentManager.NumberOfSlides;

		this.IsWaiting = knockout.computed(() => this.IsWaitingForNext());

		this.IsPreviousSlideVisible = knockout.computed(() => ExperimentManager.GoToPreviousSlideEnabled() && !ExperimentManager.CloseSlidesEnabled());
		this.IsPreviousSlideEnabled = knockout.computed(() => this.IsPreviousSlideVisible() && !this.IsLoadingSlide() && this.SlideIndex() !== 0 && !this.IsWaiting());
		this.IsNextSlideVisible = knockout.computed(() => this.SlideNumber() !== this.NumberOfSlides());
		this.IsNextSlideEnabled = knockout.computed(() => this.IsNextSlideVisible() && !this.IsLoadingSlide() && !this.IsWaiting());
		this.IsCloseExperimentVisible = knockout.computed(() => ExperimentManager.IsExperimentCompleted() && ExperimentManager.CloseExperimentEnabled());
		this.IsCloseExperimentEnabled = knockout.computed(() => this.IsCloseExperimentVisible() && !this.IsWaiting());

		this.Title = ExperimentManager.SlideTitle;
		this.HasTitle = knockout.computed(() => this.Title() !== "");

		this._subscriptions.push(ExperimentManager.IsReady.subscribe(r =>
		{
			if (!r) return;

			this.LoadNextSlide();
		}));

		this.IsHighlighted.subscribe(value =>
		{
			if (value) setTimeout(() => this.IsHighlighted(false), 3000); //TODO: add binding to listen to the event for animation complete instead of timeout
		});

		if (ExperimentManager.IsReady()) this.LoadNextSlide();
	}

	public GoToNextSlide():void
	{
		this.IsWaitingForNext(true);

		this.DoWhenDone(() => !this.IsLoadingSlide() && !this.SlideData().IsWorking(), () =>
		{
			this.IsWaitingForNext(false);

			if (this.AreAllQuestionsAnswered())
			{
				this.LoadNextSlide();
			}
			else
			{
				this.SlideData().ScrollToFirstInvalidAnswer();

				if (this.IsHighlighted())
				{
					this.IsHighlighted(false);
					setTimeout(() => this.IsHighlighted(true), 50);
				}
				else
					this.IsHighlighted(true);
			}
		});
	}

	private LoadNextSlide():void
	{
		this.UnloadSlide(true);

		ExperimentManager.LoadNextSlide((index, questions) => this.SlideData(new SlideModel("Slides/Default", index, this.AreAllQuestionsAnswered, questions)));
	}

	public GoToPreviousSlide():void
	{
		this.UnloadSlide(false);

		ExperimentManager.LoadPreviousSlide((index, questions) => this.SlideData(new SlideModel("Slides/Default", index, this.AreAllQuestionsAnswered, questions)));
	}

	private DoWhenDone(check:() => boolean, action:() => void):void
	{
		if (check())
		{
			action();
			return;
		}
		var sub = knockout.computed(check).subscribe(v =>
		{
			sub.dispose();
			action();
		});
		this._subscriptions.push(sub);
	}

	private UnloadSlide(complete:boolean):void
	{
		this.IsHighlighted(false);

		if (complete && this.SlideData() != null)
		{
			var oldSlide = this.SlideData();
			this.SlideData().Complete(() => ExperimentManager.CloseSlide(oldSlide.Index));
		}

		this.SlideData(null);
	}

	public Close():void
	{
		ExperimentManager.Close();
	}

	public dispose():void
	{
		this._subscriptions.forEach(s => s.dispose());

	}
}

export = SlideShell;