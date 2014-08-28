import Navigation = require("Navigation");
import Experiment = require("ViewModels/Experiments/Experiment");
import ExperimentManager = require("ViewModels/Experiments/ExperimentManager");

class Experiments
{
	public Experiments: KnockoutObservableArray<Experiment>;

	private _experimentChangeSubscription:KnockoutSubscription;

	constructor(experimentId:string)
	{
		this.Experiments = ExperimentManager.Experiments;

		this.HookupExperiments();
		this.Experiments().forEach(e => { if (e.Id() == experimentId) e.IsSelected(true); });
		this._experimentChangeSubscription = this.Experiments.subscribe(e => this.ExperimentsChanged(e));
	}

	public CreateExperiment():void
	{
		Navigation.Navigate("CreateExperiment");
	}

	public dispose():void
	{
		this.Experiments().forEach(e => { e.SelectorCallback = null; });
		this._experimentChangeSubscription.dispose();
	}

	private HookupExperiments():void
	{
		this.Experiments().forEach(e => e.SelectorCallback = ex => this.ExperimentSelected(ex));
	}

	private ExperimentsChanged(value:Experiment[]):void
	{
		this.HookupExperiments();
	}

	private ExperimentSelected(experiment:Experiment):void
	{
		console.log("sdfsdfd");
		this.Experiments().forEach(e =>
		{
			if (e != experiment && e.IsSelected())
				e.IsSelected(false);
		});
	}
}

export = Experiments;