import Shell = require("ViewModels/Shell")

class Application
{
	public Shell: Shell;

	constructor()
	{
		this.Shell = new Shell();
	}
}

export = Application;