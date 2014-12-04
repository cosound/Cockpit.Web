import knockout = require("knockout");

class NavigationPage
{
	public Name: KnockoutObservable<string> = knockout.observable<string>();
	public Data: KnockoutObservable<any> = knockout.observable<any>();

	constructor(name?: string, data?: any)
	{
		this.Name(name);
		this.Data(data);
	}
}

export = NavigationPage;