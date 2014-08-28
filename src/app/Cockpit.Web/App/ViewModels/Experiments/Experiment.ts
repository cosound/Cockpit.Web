import knockout = require("knockout");
import Participant = require("ViewModels/Experiments/Participant");

class Experiment
{
	public Id: KnockoutObservable<string> = knockout.observable<string>();
	public Name: KnockoutObservable<string> = knockout.observable<string>();
	public Participants: KnockoutObservableArray<Participant> = knockout.observableArray<Participant>();
	public Configuration: KnockoutObservable<string> = knockout.observable<string>();

	public IsSelected: KnockoutObservable<boolean> = knockout.observable<boolean>(false);

	public SelectorCallback:(experiment:Experiment)=>void;

	constructor()
	{
		
	}

	public Select():void
	{
		this.IsSelected(true);

		if (this.SelectorCallback != null)
			this.SelectorCallback(this);
	}
}

export = Experiment;