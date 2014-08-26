/// <amd-dependency path="less!Styles/Default" />
import Shell = require("ViewModels/Shell")
import Navigation = require("Navigation")

class Application
{
	constructor()
	{
		Navigation.Initialize();
	}
}

export = Application;