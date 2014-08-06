/// <amd-dependency path="less!Styles/Selections" />

import knockout = require("knockout");
import SelectionManager = require("SelectionManager");
import SearchResult = require("ViewModels/Search/SearchResult");
import Selection = require("ViewModels/Selections/Selection");

class Selections
{
	public Selections: KnockoutObservableArray<Selection>;
	public HighlightedSelection: KnockoutObservable<Selection> = knockout.observable<Selection>();

	constructor()
	{
		this.Selections = SelectionManager.Selections;

		if (SelectionManager.Selections().length != 0)
			this.HighlightedSelection(SelectionManager.Selections()[0]);

		for (var i = 0; i < SelectionManager.Selections().length; i++)
			SelectionManager.Selections()[i].SetSelector(s=> this.SearchResultSelected(s));
	}

	private SearchResultSelected(selection: Selection): void
	{
		this.HighlightedSelection(selection);
	}
}

export = Selections;