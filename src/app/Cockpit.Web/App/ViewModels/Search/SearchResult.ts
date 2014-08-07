import knockout = require("knockout");

class SearchResult
{
	private _selector: (s: SearchResult) => void;

	public Title: KnockoutObservable<string> = knockout.observable<string>("");
	public Date: KnockoutObservable<string> = knockout.observable<string>();
	public Selected: KnockoutObservable<boolean> = knockout.observable<boolean>(false);

	constructor(title:string, date:Date)
	{
		this.Title(title);
		this.Date(date.getDate() + " / " + (date.getMonth() + 1) + " - " + date.getFullYear());
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