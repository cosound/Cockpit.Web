import Shell = require("ViewModels/Shell")
import Navigation = require("Navigation")

class Application
{
	public Shell: Shell;

	constructor()
	{
		Navigation.Initialize();
		this.Shell = new Shell();
	}
}

export = Application;