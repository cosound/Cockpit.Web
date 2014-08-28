import knockout = require("knockout");
import Navigation = require("Navigation");
import Experiment = require("ViewModels/Experiments/Experiment");
import ExperimentManager = require("ViewModels/Experiments/ExperimentManager");

class Experiments
{
	public Experiments: KnockoutObservableArray<Experiment>;
	public SelectedExperiment: KnockoutObservable<Experiment> = knockout.observable<Experiment>();
	
	private _experimentChangeSubscription:KnockoutSubscription;

	constructor(experimentId:string)
	{
		this.Experiments = ExperimentManager.Experiments;

		this.HookupExperiments();
		this.Experiments().forEach(e => { if (e.Id() == experimentId) this.SelectedExperiment(e); });
		this._experimentChangeSubscription = this.Experiments.subscribe(e => this.ExperimentsChanged(e));
	}

	public CreateExperiment():void
	{
		Navigation.Navigate("CreateExperiment");
	}

	public dispose():void
	{
		this.Experiments().forEach(e => { e.SelectorCallback = null; });
		this.SelectedExperiment(null);
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
		this.SelectedExperiment(experiment);
	}
}

export = Experiments;