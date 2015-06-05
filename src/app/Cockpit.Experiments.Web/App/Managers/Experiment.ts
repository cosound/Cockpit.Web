import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import Navigation = require("Managers/Navigation");

class Experiment
{
	public IsReady: KnockoutObservable<boolean> = knockout.observable<boolean>(false);
	public NumberOfSlides: KnockoutObservable<number> = knockout.observable<number>(0);
	public Title: KnockoutObservable<string> = knockout.observable("");
	public CloseSlides: KnockoutObservable<boolean> = knockout.observable(false);
	public EnablePrevious: KnockoutObservable<boolean> = knockout.observable(true);
	public FooterLabel: KnockoutObservable<string> = knockout.observable(null);
	public SlideName: KnockoutObservable<string> = knockout.observable("slide");
	public CurrentSlideIndex:KnockoutObservable<number> = knockout.observable(0);

	private _id: string;
	private _hasLoadedCurrentSlide:boolean = false;

	public Load(id: string): void
	{
		this._id = id;

		this.IsReady(false);
		this._hasLoadedCurrentSlide = false;

		CockpitPortal.Experiment.Get(this._id).WithCallback(response =>
		{
			if (response.Error != null) throw new Error("Failed to load Experiment: " + response.Error.Message);
			if (response.Body.Results.length === 0) throw new Error("No Experiment data retuened");

			var config = response.Body.Results[0];

			this.CloseSlides(config.LockQuestion);
			this.EnablePrevious(config.EnablePrevious);
			this.FooterLabel(config.FooterLabel);
			this.CurrentSlideIndex(config.CurrentSlideIndex);

			this.IsReady(true);
		});
	}

	public LoadNextSlide(callback: (slideIndex:number, questions: CockpitPortal.IQuestion[]) => void):void
	{
		this.LoadSlide(this.CurrentSlideIndex() + (this._hasLoadedCurrentSlide ? + 1 : 0), callback);
	}

	private LoadSlide(index: number, callback: (slideIndex:number, questions: CockpitPortal.IQuestion[]) => void): void
	{
		CockpitPortal.Question.Get(this._id, index).WithCallback(response =>
		{
			if (response.Error != null)
			{
				if (response.Error.Fullname === "Chaos.Cockpit.Core.Core.Exceptions.SlideLockedException")
				{
					Navigation.Navigate("SlideLocked");
					return;
				}
				else if (response.Error.Message === "No Questionaire found by that Id")
				{
					Navigation.Navigate("ExperimentNotFound/" + this._id);
					return;
				}
				else
					throw new Error("Failed to get slide: " + response.Error.Message);
			}

			if (response.Body.Count === 0)
				throw new Error("No slide returned");

			this.NumberOfSlides(response.Body.FoundCount);

			this._hasLoadedCurrentSlide = true;
			this.CurrentSlideIndex(index);

			callback(index, response.Body.Results);
		});
	}

	public SaveQuestionAnswer(id: string, answer: any, callback: () => void): void
	{
		CockpitPortal.Answer.Set(id, answer).WithCallback(response =>
		{
			callback();
			if (response.Error != null)
				throw new Error("Failed to save answer: " + response.Error.Message);
		});
	}

	public CloseSlide(index: number): void
	{
		CockpitPortal.Slide.Completed(this._id, index).WithCallback(response =>
		{
			if (response.Error != null)
				throw new Error("Failed to close slide: " + response.Error.Message);
		});
	}
}

var instance = new Experiment();

export = instance;