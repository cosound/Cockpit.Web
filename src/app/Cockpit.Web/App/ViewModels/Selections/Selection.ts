import knockout = require("knockout");
import SearchResult = require("ViewModels/Search/SearchResult");

class Selection
{
	private _selector: (s: Selection) => void;

	public Name:KnockoutObservable<string> = knockout.observable("");
	public SearchResults: KnockoutObservableArray<SearchResult> = knockout.observableArray<SearchResult>();
	public CreatedDate: KnockoutObservable<string> = knockout.observable("");

	constructor(name?: string, searchResults?: SearchResult[])
	{
		if (name) this.Name(name);
		if (searchResults) this.SearchResults.push.apply(this.SearchResults, searchResults);

		var date = new Date();
		this.CreatedDate(date.getDate() + " / " + (date.getMonth() + 1) + " - " + date.getFullYear());
	}

	public SetSelector(selector: (s: Selection) => void): Selection
	{
		this._selector = selector;
		return this;
	}

	public Select(): boolean
	{
		if (this._selector) this._selector(this);

		return true;
	}
}

export = Selection;