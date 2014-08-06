import knockout = require("knockout");
import SearchResult = require("ViewModels/Search/SearchResult");

class Selection
{
	public Name:KnockoutObservable<string> = knockout.observable("");
	public SearchResults: KnockoutObservableArray<SearchResult> = knockout.observableArray < SearchResult>();

	constructor(name?: string, searchResults?: SearchResult[])
	{
		if (name) this.Name(name);
		if (searchResults) this.SearchResults.push.apply(this.SearchResults, searchResults);
	}
}

export = Selection;