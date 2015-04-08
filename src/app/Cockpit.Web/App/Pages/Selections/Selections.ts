import knockout = require("knockout");
import Notification = require("Managers/Notification");
import Title = require("Managers/Title");
import SelectionsManager = require("Managers/Selections");
import Selection = require("Data/Selection");

class Selections
{
	public Selections: KnockoutObservableArray<Selection>;
	public NewSelectionName:KnockoutObservable<string> = knockout.observable("");

	constructor()
	{
		Title.ToDefault("Selections");
		this.Selections = SelectionsManager.Selections;
	}

	public Add():void
	{
		SelectionsManager.Create(this.NewSelectionName(), success =>
		{
			if (success) this.NewSelectionName("");
		});
	}
}

export = Selections;