import knockout = require("knockout");

class Page
{
	public Name: KnockoutObservable<string> = knockout.observable<string>();
	public Parameters: KnockoutObservable<any> = knockout.observable<any>();

	constructor(name:string, parameters:any = null)
	{
		this.Name(name);
		this.Parameters(parameters);
	}
}

export = Page;