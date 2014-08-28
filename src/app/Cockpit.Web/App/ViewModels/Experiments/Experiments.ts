import Navigation = require("Navigation");

class Experiments
{
	constructor()
	{
		
	}

	public CreateExperiment():void
	{
		Navigation.Navigate("CreateExperiment");
	}
}

export = Experiments;