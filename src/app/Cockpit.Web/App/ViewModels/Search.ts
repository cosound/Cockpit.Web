import knockout = require("knockout");
import SearchResult = require("ViewModels/SearchResult");

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
}

export = Search;