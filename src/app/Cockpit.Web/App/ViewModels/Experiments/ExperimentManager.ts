import knockout = require("knockout");
import Experiment = require("ViewModels/Experiments/Experiment");
import Participant = require("ViewModels/Experiments/Participant");

export var Experiments: KnockoutObservableArray<Experiment> = knockout.observableArray<Experiment>();

InitializeFakeExperiments();

export function CreateExperiment(name:string, emails:string[], configuration:string, callback:(success:boolean, experiment:Experiment) => void):void
{
	FakeCreateExperiment(name, emails, configuration, callback);
}

function InitializeFakeExperiments():void
{
	FakeCreateExperiment("My Experiment", ["Peter@Test.com", "Jesper@test.com"], "<Configuration></Configuration>", null);
	FakeCreateExperiment("My Other Experiment", ["Peter@Test.com", "Jesper@test.com"], "<Configuration></Configuration>", null);
	FakeCreateExperiment("My Super Experiment", ["Peter@Test.com", "Jesper@test.com"], "<Configuration></Configuration>", null);
	FakeCreateExperiment("My Fantastic Experiment 1", ["Peter@Test.com", "Jesper@test.com"], "<Configuration></Configuration>", null);
	FakeCreateExperiment("My Meh Experiment", ["Peter@Test.com", "Jesper@test.com"], "<Configuration></Configuration>", null);
}

function FakeCreateExperiment(name: string, emails: string[], configuration: string, callback: (success: boolean, experiment: Experiment) => void):void
{
	window.setTimeout(() =>
	{
		var experiement = new Experiment();
		var participants = emails.map(v => new Participant(v, "Some response: " + (Math.random() * 10000).toString()))

		experiement.Id(Math.floor(Math.random() * 10000).toString());
		experiement.Name(name);
		experiement.Configuration(configuration);
		experiement.Participants.push.call(experiement.Participants, participants);

		Experiments.push(experiement);

		if(callback != null)
			callback(true, experiement);
	}, 100);
}