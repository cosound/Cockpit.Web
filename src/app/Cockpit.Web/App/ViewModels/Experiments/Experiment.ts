import knockout = require("knockout");
import Participant = require("ViewModels/Experiments/Participant");

class Experiment
{
	public Id: KnockoutObservable<string> = knockout.observable<string>();
	public Name: KnockoutObservable<string> = knockout.observable<string>();
	public Participants: KnockoutObservableArray<Participant> = knockout.observableArray<Participant>();
	public Configuration: KnockoutObservable<string> = knockout.observable<string>();

	constructor()
	{
		
	}
}

export = Experiment;