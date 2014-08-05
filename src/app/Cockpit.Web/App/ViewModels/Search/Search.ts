import knockout = require("knockout");
import Navigation = require("Navigation");
import SelectionManager = require("SelectionManager");
import SearchResult = require("ViewModels/Search/SearchResult");

class Search
{
	public Query: KnockoutObservable<string> = knockout.observable<string>("");
	public Results: KnockoutObservableArray<SearchResult> = knockout.observableArray<SearchResult>();

	public Search():void
	{
		this.Results.removeAll();

		for (var i = 0; i < 20; i++)
			this.Results.push(new SearchResult(this.Query() + " Result " + i));
	}

	public CreateSelection():void
	{
		var selectedResults = new Array<SearchResult>();

		for (var i = 0; i < this.Results().length; i++)
		{
			var result = this.Results()[i];
			if (result.Selected())
				selectedResults.push(result);
		}

		SelectionManager.SetNewSelectionResults(selectedResults);

		Navigation.Navigate("Selections")
	}
}

export = Search;