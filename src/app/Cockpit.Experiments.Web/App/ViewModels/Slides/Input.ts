import knockout = require("knockout");

class Input
{
	public Configuration: IInput;
	public Value: KnockoutObservable<any> = knockout.observable<any>(null);

	constructor(configuration:IInput)
	{
		this.Configuration = configuration;
	}
}

export = Input;