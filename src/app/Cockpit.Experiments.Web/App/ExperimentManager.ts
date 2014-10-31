import knockout = require("knockout");
import ExperimentData = require("ExperimentData");
import CockpitPortal = require("CockpitPortal");
import AnswerModel = require("Models/Answer");

export var IsReady: KnockoutObservable<boolean> = knockout.observable<boolean>(false);
export var NumberOfSlides:KnockoutObservable<number> = knockout.observable<number>(0);

var _id:string;

export function SetId(id: string): void
{
	_id = id;

	IsReady(true);
}

export function LoadSlide(index:number, callback:(questions:CockpitPortal.IQuestion[])=>void ):void
{
	CockpitPortal.Questionnaire.Get(_id, index).WithCallback(response =>
	{
		if (response.Error != null)
			throw new Error("Failed to get slide: " + response.Error.Message);

		if (response.Body.Count == 0)
			throw new Error("No slide returned");

		NumberOfSlides(response.Body.TotalCount);

		callback(response.Body.Results);
	});
}

export function SaveQuestionAnswer(id: string, answer: AnswerModel)
{
	CockpitPortal.Answer.Set(id, JSON.stringify(answer)).WithCallback(response =>
	{
		if (response.Error != null)
			throw new Error("Failed to save answer: " + response.Error.Message);
	});
}