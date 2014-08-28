import Navigation = require("Navigation");
import Experiment = require("ViewModels/Experiments/Experiment");
import ExperimentManager = require("ViewModels/Experiments/ExperimentManager");

class Experiments
{
	public Experiments: KnockoutObservableArray<Experiment>;

	constructor(experimentId:string)
	{
		this.Experiments = ExperimentManager.Experiments;

		console.log("Load Experiment: " + experimentId);
	}

	public CreateExperiment():void
	{
		Navigation.Navigate("CreateExperiment");
	}
}

export = Experiments;