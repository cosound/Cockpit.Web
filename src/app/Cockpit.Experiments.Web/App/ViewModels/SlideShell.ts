﻿import knockout = require("knockout");
import ExperimentManager = require("ExperimentManager");
import CockpitPortal = require("CockpitPortal");
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

	private _experiment:CockpitPortal.IQuestionnaire;

	constructor()
	{
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

		ExperimentManager.SaveSlideData(this.SlideNumber(), this.Slide().Data().UserInput());

		this.SlideNumber(this.SlideNumber() + 1);

		this.LoadSlide(this.SlideNumber());
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
		var slide: CockpitPortal.ISlide;

		this.SlideNumber(index + 1);

		if (index < this._experiment.Slides.length)
			slide = this._experiment.Slides[index];
		else
		{
			this.AreFooterControlsVisible(false);
			//slide = this._experiment.CompletedSlide;
		}

		this.Slide(new NavigationPage("Slides-" + slide, { Slide: slide, CanGoToNextSlide: this.CanGoToNextSlide, UserInput: knockout.observable(null)}));
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