import knockout = require("knockout");
import Navigation = require("Navigation");
import ExperimentManager = require("ViewModels/Experiments/ExperimentManager");


class CreateExperiment
{
	public Name: KnockoutObservable<string> = knockout.observable("");
	public Emails: KnockoutObservable<string> = knockout.observable("");
	public Configuration: KnockoutObservable<string> = knockout.observable("");
	public IsCreating: KnockoutObservable<boolean> = knockout.observable(false);

	public CanCreate: KnockoutComputed<boolean>;

	constructor()
	{
		this.CanCreate = knockout.computed(() => this.Name() != "" && this.Emails() != "" && this.Configuration() != "" && !this.IsCreating());
	}

	public Create():void
	{
		if (this.IsCreating() || !this.CanCreate()) return;
		this.IsCreating(true);

		ExperimentManager.CreateExperiment(this.Name(), this.Emails().split(","), this.Configuration(), (success, experiment) =>
		{
			if (success)
				Navigation.Navigate("Experiments/" + experiment.Id());
			else
				console.log("Failed to create experiment");

			this.IsCreating(false);
		});
	}
}

export = CreateExperiment;