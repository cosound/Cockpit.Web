import knockout = require("knockout"); 
import Portal = require("Portal");
import Configuration = require("Managers/Configuration");

export var Client: CHAOS.Portal.Client.IPortalClient;
export var ServiceCaller: CHAOS.Portal.Client.IServiceCaller;
export var HasSession:KnockoutObservable<boolean> = knockout.observable(false);

function Initialize():void
{
	Client = (<any>Portal).Initialize(Configuration.PortalServicePath, null, false);
	ServiceCaller = <CHAOS.Portal.Client.IServiceCaller><any>Client;

	Client.SessionAcquired().Add(() => HasSession(true));
}

export function WhenSessionIsAcquired(callback:() => void):void
{
	if (HasSession())
		callback();
	else
	{
		var sub = HasSession.subscribe(() =>
		{
			sub.dispose();
			callback();
		});
	}
}

export class Search
{
	public static Get(query: string, tag:string, facets:string, pageIndex:number, pageSize:number): CHAOS.Portal.Client.ICallState<ISearchResult>
	{
		return ServiceCaller.CallService("Search/Get", CHAOS.Portal.Client.HttpMethod.Get, { q: query, tag: tag, facets: facets, pageIndex: pageIndex, pageSize: pageSize }, true);
	}
}

export interface ISearchResult
{
	Identifier: string;
	Fields: { [key: string]: string };
}

Initialize();