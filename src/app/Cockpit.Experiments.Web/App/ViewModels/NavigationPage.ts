import knockout = require("knockout");

class NavigationPage
{
	public Name: KnockoutObservable<string> = knockout.observable<string>();
	public Data: KnockoutObservable<string> = knockout.observable<string>();

	constructor(name?:string, data?:string)
	{
		this.Name(name);
		this.Data(data);
	}
}

export = NavigationPage;