import knockout = require("knockout");
import experimentData = require("ExperimentData");

export var Experiment: KnockoutObservable<IExperiment> = knockout.observable<IExperiment>();
export var ExperimentLoaded: KnockoutComputed<boolean> = knockout.computed<boolean>(() => Experiment() != null);
export var ExperimentIsLoading: KnockoutObservable<boolean> = knockout.observable<boolean>(false);

export function LoadExperiment(id: string): void
{
	ExperimentIsLoading(true);
	Experiment(GetData());
	ExperimentIsLoading(false);
}

export function SaveSlideData(id:number, data:any)
{
	console.log("Saving data for slide " + id + ": " + data);
}

function GetData():any
{
	return {
		Name: "Was the 80's the worst decade for music?",
		CompletedSlide: {
			Type: "ThankYou",
			Text: "We appreciate your time"
		},
		Slides: [
			{
				Type: "Intro",
				Text: "Hey and welcome to experiment about music."
			},
			{
				Type: "Form",
				Inputs: [
					{
						Type: "Text",
						Label: "Name"
					},
					{
						Type: "Text",
						Label: "Age"
					},
					{
						Type: "Radio",
						Label: "Gender",
						Options: [
							"Male",
							"Female"
						]
					}
					,
					{
						Type: "Radio",
						Label: "Music Lover",
						Options: [
							"Yes",
							"A bit",
							"No"
						]
					}
				]
			},
			{
				Type: "AudioRating",
				StreamUrl: "http://Cocking.dk/Mystream.mp4",
				RatingLabel: "Mood"
			}
		]
	};
}