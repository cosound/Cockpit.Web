import knockout = require("knockout");
import SelectionManager = require("SelectionManager");
import SearchResult = require("ViewModels/Search/SearchResult");
import Selection = require("ViewModels/Selections/Selection");

class Selections
{
	public Selections: KnockoutObservableArray<Selection>;

	constructor()
	{
		this.Selections = SelectionManager.Selections;
	}
}

export = Selections;