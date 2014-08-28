import knockout = require("knockout");
import Participant = require("ViewModels/Experiments/Participant");

class Experiment
{
	public Id: KnockoutObservable<string> = knockout.observable<string>();
	public Name: KnockoutObservable<string> = knockout.observable<string>();
	public Participants: KnockoutObservableArray<Participant> = knockout.observableArray<Participant>();
	public Configuration: KnockoutObservable<string> = knockout.observable<string>();

	public SelectorCallback:(experiment:Experiment)=>void;

	constructor()
	{
		
	}

	public Select():void
	{
		if (this.SelectorCallback != null)
			this.SelectorCallback(this);
	}
}

export = Experiment;