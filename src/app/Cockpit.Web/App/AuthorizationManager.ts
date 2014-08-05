import knockout = require("knockout");

export var IsAuthenticated: KnockoutObservable<boolean> = knockout.observable<boolean>(false);

export function Authenticate():void
{
	IsAuthenticated(true);
}