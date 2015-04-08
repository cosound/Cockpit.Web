import knockout = require("knockout");
import Portal = require("Managers/Portal");

class SearchResult
{
	public Id: string;
	public Title: string;
	public IsSelected: KnockoutObservable<boolean> = knockout.observable(false);
	public CanSelectSearchHits:KnockoutComputed<boolean>;

	constructor(data: Portal.ISearchResult, canSelectSearchHits:KnockoutComputed<boolean>)
	{
		this.Id = data.Id;
		this.Title = data.Title;
		this.CanSelectSearchHits = canSelectSearchHits;
	}
}

export = SearchResult;