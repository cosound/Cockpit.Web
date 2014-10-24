import Portal = require("Portal");
import Configuration = require("Configuration");

export var Client:CHAOS.Portal.Client.IPortalClient;

function Initialize():void
{
	Client = CHAOS.Portal.Client.Initialize(Configuration.PortalPath);
}

export class Questionnaire
{
	public static Get(id: string, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): CHAOS.Portal.Client.ICallState<IQuestionnaire>
	{
		if (serviceCaller == null)
			serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

		return serviceCaller.CallService("Questionnaire/Get", CHAOS.Portal.Client.HttpMethod.Get, {id: id}, false);
	}
}

export interface IQuestionnaire
{
	Id: string;
	Name: string;
	Slides:ISlide[];
}

export interface ISlide
{
	Questions:IQuestion[];
}

export interface IQuestion
{
	Id:string;
	Fullname:string;
}

Initialize();