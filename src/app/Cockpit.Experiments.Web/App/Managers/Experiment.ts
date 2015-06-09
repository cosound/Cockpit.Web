import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import Navigation = require("Managers/Navigation");

class Experiment
{
	public IsReady: KnockoutObservable<boolean> = knockout.observable<boolean>(false);

	public CurrentSlideIndex: KnockoutObservable<number> = knockout.observable(0);
	public NumberOfSlides: KnockoutObservable<number> = knockout.observable<number>(0);

	public IsExperimentCompleted: KnockoutObservable<boolean> = knockout.observable(false);

	public Title: KnockoutObservable<string> = knockout.observable("");
	public FooterLabel: KnockoutObservable<string> = knockout.observable(null);
	public SlideName: KnockoutObservable<string> = knockout.observable("slide");

	public CloseExperimentEnabled: KnockoutObservable<boolean> = knockout.observable(false);
	public CloseSlidesEnabled: KnockoutObservable<boolean> = knockout.observable(false);
	public GoToPreviousSlideEnabled: KnockoutObservable<boolean> = knockout.observable(true);
	
	private _id: string;
	private _hasLoadedCurrentSlide: boolean = false;
	private _listExperiments: { [listId: string]: string } = {};

	public ExperimentCompleted():void
	{
		this.IsExperimentCompleted(true);
	}

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

			this.CloseSlidesEnabled(config.LockQuestion);
			this.GoToPreviousSlideEnabled(config.EnablePrevious || true);
			this.FooterLabel(config.FooterLabel);
			this.CurrentSlideIndex(config.CurrentSlideIndex);
			this.IsExperimentCompleted(false);

			this.IsReady(true);
		});
	}

	public LoadNext(listId:string):void
	{
		if (this._listExperiments[listId])
		{
			Navigation.Navigate("Experiment/" + this._listExperiments[listId]);
			return;
		}

		CockpitPortal.Experiment.Next(listId).WithCallback(response =>
		{
			if (response.Error != null)
			{
				Navigation.Navigate("NoMoreExperiments");
				return;
			}

			if (response.Body.Results.length === 0)
				Navigation.Navigate("NoMoreExperiments");
			else
			{
				this._listExperiments[listId] = response.Body.Results[0].Id;

				Navigation.Navigate("Experiment/" + response.Body.Results[0].Id);
			}
				
		});
	}

	public LoadNextSlide(callback: (slideIndex:number, questions: CockpitPortal.IQuestion[]) => void):void
	{
		this.LoadSlide(this.CurrentSlideIndex() + (this._hasLoadedCurrentSlide ? 1 : 0), callback);
	}

	public LoadPreviousSlide(callback: (slideIndex: number, questions: CockpitPortal.IQuestion[]) => void): void
	{
		this.LoadSlide(this.CurrentSlideIndex() +  -1, callback);
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

	public Close():any
	{
		
	}
}

var instance = new Experiment();

export = instance;