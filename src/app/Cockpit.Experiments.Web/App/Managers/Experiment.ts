import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import Navigation = require("Managers/Navigation");
import Configuration = require("Configuration");

export var IsReady: KnockoutObservable<boolean> = knockout.observable<boolean>(false);
export var NumberOfSlides: KnockoutObservable<number> = knockout.observable<number>(0);
export var Title:KnockoutObservable<string> = knockout.observable("");

var _id:string;

export function Load(id: string): void
{
	_id = id;

	if (IsReady()) IsReady(false);

	CockpitPortal.Experiment.Get(_id).WithCallback(response =>
	{
		if (response.Error != null) throw new Error("Failed to load Experiment: " + response.Error.Message);
		if (response.Body.Results.length === 0) throw new Error("No Experiment data retuened");

		var config = response.Body.Results[0];

		Configuration.CloseSlides = config.LockQuestion;
		Configuration.FooterLabel(config.FooterLabel);

		IsReady(true);
	});
}

export function LoadSlide(index:number, callback:(questions:CockpitPortal.IQuestion[])=>void ):void
{
	CockpitPortal.Question.Get(_id, index).WithCallback(response =>
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
				Navigation.Navigate("ExperimentNotFound/" + _id);
				return;
			}
			else
				throw new Error("Failed to get slide: " + response.Error.Message);
		}

		if (response.Body.Count === 0)
			throw new Error("No slide returned");

		NumberOfSlides(response.Body.FoundCount);

		callback(response.Body.Results);
	});
}

export function SaveQuestionAnswer(id: string, answer: any, callback:()=>void): void
{
	CockpitPortal.Answer.Set(id, answer).WithCallback(response =>
	{
		callback();
		if (response.Error != null)
			throw new Error("Failed to save answer: " + response.Error.Message);
	});
}

export function CloseSlide(index:number):void
{
	CockpitPortal.Slide.Close(_id, index).WithCallback(response =>
	{
		if (response.Error != null)
			throw new Error("Failed to close slide: " + response.Error.Message);
	});
}