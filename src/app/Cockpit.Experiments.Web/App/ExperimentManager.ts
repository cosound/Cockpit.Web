﻿import knockout = require("knockout");
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
		Name: "My Experiment",
		CompletedSlide: {
			Type: "ThankYou",
			Text: "We appreciate your time"
		},
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
			},
			{
				Type: "AudioRating",
				StreamUrl: "http://Cocking.dk/Mystream.mp4",
				RatingLabel: "Mood"
			}
		]
	};
}