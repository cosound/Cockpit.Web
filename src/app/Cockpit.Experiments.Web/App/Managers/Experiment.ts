﻿import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import Navigation = require("Managers/Navigation");

export var IsReady: KnockoutObservable<boolean> = knockout.observable<boolean>(false);
export var NumberOfSlides:KnockoutObservable<number> = knockout.observable<number>(0);

var _id:string;

export function SetId(id: string): void
{
	_id = id;

	if (IsReady()) IsReady(false);

	IsReady(true);
}

export function LoadSlide(index:number, callback:(questions:CockpitPortal.IQuestion[])=>void ):void
{
	CockpitPortal.Question.Get(_id, index).WithCallback(response =>
	{
		if (response.Error != null)
		{
			if (response.Error.Message === "No Questionaire found by that Id")
			{
				Navigation.Navigate("SlideLocked");
				return;
			}
			else
				throw new Error("Failed to get slide: " + response.Error.Message);
		}

		if (response.Body.Count == 0)
			throw new Error("No slide returned");

		NumberOfSlides(response.Body.FoundCount);

		callback(response.Body.Results);
	});
}

export function SaveQuestionAnswer(id: string, answer: any): void
{
	CockpitPortal.Answer.Set(id, answer).WithCallback(response =>
	{
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