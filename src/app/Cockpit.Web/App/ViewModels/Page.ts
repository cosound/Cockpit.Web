import knockout = require("knockout");

class Page
{
	public Name: KnockoutObservable<string> = knockout.observable<string>();

	constructor(name?:string)
	{
		this.Name(name);
	}
}

export = Page;