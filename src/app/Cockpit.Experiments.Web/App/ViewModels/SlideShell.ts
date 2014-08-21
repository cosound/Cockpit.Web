import knockout = require("knockout");
import ExperimentManager = require("ExperimentManager");
import NavigationPage = require("ViewModels/NavigationPage");
import Navigation = require("Navigation");

class SlideShell
{
	public Name: KnockoutObservable<string> = knockout.observable<string>();
	public Slide: KnockoutObservable<NavigationPage> = knockout.observable<NavigationPage>();
	public CanGoToNextSlide: KnockoutObservable<boolean> = knockout.observable<boolean>(false);
	public SlideNumber:KnockoutObservable<number> = knockout.observable<number>(0);
	public NumberOfSlides: KnockoutObservable<number> = knockout.observable<number>(0);
	public AreFooterControlsVisible: KnockoutObservable<boolean> = knockout.observable<boolean>(true);

	private _experimentLoadedSubscription: KnockoutSubscription;
	private _slideIdSubscription: KnockoutSubscription;

	private _experiment:IExperiment;
	private _slideId: KnockoutObservable<number>;

	constructor(data:any)
	{
		this._slideId = data.SlideId;
		this._slideIdSubscription = this._slideId.subscribe(id => this.LoadSlide(id));

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

		ExperimentManager.SaveSlideData(this._slideId(), this.Slide().Data().UserInput());

		Navigation.Navigate("Experiment/7/" + (this._slideId() + 1));
	}

	private LoadExperiment():void
	{
		this._experiment = ExperimentManager.Experiment();
		this.Name(this._experiment.Name);
		this.NumberOfSlides(this._experiment.Slides.length);
		this.LoadSlide(this._slideId());
	}

	private LoadSlide(id:number):void
	{
		var slide: ISlide;

		this.SlideNumber(id + 1);

		if (id < this._experiment.Slides.length)
			slide = this._experiment.Slides[id];
		else
		{
			this.AreFooterControlsVisible(false);
			slide = this._experiment.CompletedSlide;
		}

		this.Slide(new NavigationPage("Slides-" + slide.Type, { Slide: slide, CanGoToNextSlide: this.CanGoToNextSlide, UserInput: knockout.observable(null)}));
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

		this._slideIdSubscription.dispose();
		this._slideIdSubscription = null;
	}
}

export = SlideShell;