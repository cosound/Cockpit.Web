import knockout = require("knockout");

class SearchResult
{
	public Title: KnockoutObservable<string> = knockout.observable<string>("");
	public Selected: KnockoutObservable<boolean> = knockout.observable<boolean>(false);

	constructor(title:string)
	{
		this.Title(title);
	}
}

export = SearchResult;