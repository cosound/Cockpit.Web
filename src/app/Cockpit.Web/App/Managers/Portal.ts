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
	public static Simple(query: string, pageIndex:number, pageSize:number): CHAOS.Portal.Client.ICallState<ISearchResult>
	{
		return ServiceCaller.CallService("Search/Simple", CHAOS.Portal.Client.HttpMethod.Get, { q: query, pageIndex: pageIndex, pageSize: pageSize }, true);
	}
}

export class Selection
{
	public static Get(id:string = null): CHAOS.Portal.Client.ICallState<ISelection>
	{
		return ServiceCaller.CallService("Selection/Get", CHAOS.Portal.Client.HttpMethod.Get, { id: id }, true);
	}

	public static Set(selection:ISelection): CHAOS.Portal.Client.ICallState<ISelection>
	{
		return ServiceCaller.CallService("Selection/Set", CHAOS.Portal.Client.HttpMethod.Post, { selection: JSON.stringify(selection) }, true);
	}

	public static Delete(id: string): CHAOS.Portal.Client.ICallState<any>
	{
		return ServiceCaller.CallService("Selection/Delete", CHAOS.Portal.Client.HttpMethod.Get, { id: id }, true);
	}

	public static AddItems(id: string, items:string[]): CHAOS.Portal.Client.ICallState<any>
	{
		return ServiceCaller.CallService("Selection/AddItems", CHAOS.Portal.Client.HttpMethod.Post, { id: id, items: items }, true);
	}

	public static DeleteItems(id: string, items: string[]): CHAOS.Portal.Client.ICallState<any>
	{
		return ServiceCaller.CallService("Selection/DeleteItems", CHAOS.Portal.Client.HttpMethod.Post, { id: id, items: items }, true);
	}
}

export interface ISearchResult
{
	Id: string;
	Title: string;
}

export interface ISelection
{
	Id?: string;
	Name: string;
	Items: ISelectionItem[];
}

export interface ISelectionItem
{
	Id: string;
}

Initialize();