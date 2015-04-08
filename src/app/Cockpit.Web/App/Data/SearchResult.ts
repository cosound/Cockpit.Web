import knockout = require("knockout");
import Portal = require("Managers/Portal");

class SearchResult
{
	public Id: string;
	public Title: string;
	public IsSelected: KnockoutObservable<boolean> = knockout.observable(false);

	constructor(data:Portal.ISearchResult)
	{
		this.Id = data.Id;
		this.Title = data.Title;
	}
}

export = SearchResult;