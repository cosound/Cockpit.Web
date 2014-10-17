import knockout = require("knockout");
import ExperimentData = require("ExperimentData");
import CockpitPortal = require("CockpitPortal");

export var Experiment: KnockoutObservable<CockpitPortal.IQuestionnaire> = knockout.observable<CockpitPortal.IQuestionnaire>();
export var ExperimentLoaded: KnockoutComputed<boolean> = knockout.computed<boolean>(() => Experiment() != null);
export var ExperimentIsLoading: KnockoutObservable<boolean> = knockout.observable<boolean>(false);

export function LoadExperiment(id: string): void
{
	ExperimentIsLoading(true);
	CockpitPortal.Questionnaire.Get(id).WithCallback(QuestionnaireGetCompleted, this);
}

export function SaveSlideData(id:number, data:any)
{
	console.log("Saving data for slide " + id + ": " + data);
}

function QuestionnaireGetCompleted(response: CHAOS.Portal.Client.IPortalResponse<CockpitPortal.IQuestionnaire>):void
{
	if (response.Error != null)
		throw new Error("Failed to get questionnaire: " + response.Error.Message);

	if (response.Body.Count == 0)
		throw new Error("No questionnaire returned");

	Experiment(response.Body.Results[0]);

	ExperimentIsLoading(false);
}