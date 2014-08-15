import knockout = require("knockout");
import experimentData = require("ExperimentData");

export var Experiment: KnockoutObservable<IExperiment> = knockout.observable<IExperiment>();
export var ExperimentLoaded: KnockoutComputed<boolean> = knockout.computed<boolean>(() => Experiment() != null);

export function LoadExperiment(id: string): void
{
	Experiment(GetData());
}

function GetData():any
{
	return {
		Slides: [
			{
				Type: "Intro",
				Text: "Hey and welcome to my experiment"
			},
			{
				Type: "Form",
				Inputs: [
					{
						Type: "Text",
						Label: "Name"
					},
					{
						Type: "Radio",
						Label: "Gender",
						Options: [
							"Male",
							"Female"
						]
					}
				]
			}
		]
	};
}