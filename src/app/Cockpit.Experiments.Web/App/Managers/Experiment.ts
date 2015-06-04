import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import Navigation = require("Managers/Navigation");

class Experiment
{
	public IsReady: KnockoutObservable<boolean> = knockout.observable<boolean>(false);
	public NumberOfSlides: KnockoutObservable<number> = knockout.observable<number>(0);
	public Title: KnockoutObservable<string> = knockout.observable("");
	public CloseSlides: KnockoutObservable<boolean> = knockout.observable(false);
	public FooterLabel: KnockoutObservable<string> = knockout.observable(null);
	public SlideName: KnockoutObservable<string> = knockout.observable("slide");

	private _id:string;

	public Load(id: string): void
	{
		this._id = id;

		if (this.IsReady()) this.IsReady(false);

		CockpitPortal.Experiment.Get(this._id).WithCallback(response =>
		{
			if (response.Error != null) throw new Error("Failed to load Experiment: " + response.Error.Message);
			if (response.Body.Results.length === 0) throw new Error("No Experiment data retuened");

			var config = response.Body.Results[0];

			this.CloseSlides(config.LockQuestion);
			this.FooterLabel(config.FooterLabel);

			this.IsReady(true);
		});
	}

	public LoadSlide(index: number, callback: (questions: CockpitPortal.IQuestion[]) => void): void
	{
		CockpitPortal.Question.Get(this._id, index).WithCallback(response =>
		{
			if (response.Error != null)
			{
				if (response.Error.Fullname === "Chaos.Cockpit.Core.Core.Exceptions.SlideClosedException")
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

			callback(response.Body.Results);
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
		CockpitPortal.Slide.Close(this._id, index).WithCallback(response =>
		{
			if (response.Error != null)
				throw new Error("Failed to close slide: " + response.Error.Message);
		});
	}
}

var instance = new Experiment();

export = instance;