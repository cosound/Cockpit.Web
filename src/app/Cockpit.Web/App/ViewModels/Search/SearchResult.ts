import knockout = require("knockout");

class SearchResult
{
	private _selector: (s: SearchResult) => void;

	public Title: KnockoutObservable<string> = knockout.observable<string>("");
	public Selected: KnockoutObservable<boolean> = knockout.observable<boolean>(false);

	constructor(title:string)
	{
		this.Title(title);
	}

	public SetSelector(selector: (s: SearchResult) => void): SearchResult
	{
		this._selector = selector;
		return this;
	}

	public Select():boolean
	{
		if (this._selector) this._selector(this);

		return true;
	}
}

export = SearchResult;