import Portal = require("Portal");
import Configuration = require("Configuration");

export var Client:CHAOS.Portal.Client.IPortalClient;

function Initialize():void
{
	Client = CHAOS.Portal.Client.Initialize(Configuration.PortalPath);
}

export class Question
{
	public static Get(id: string, index:number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): CHAOS.Portal.Client.ICallState<IQuestion>
	{
		if (serviceCaller == null)
			serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

		return serviceCaller.CallService("Question/Get", CHAOS.Portal.Client.HttpMethod.Get, { id: id, index: index}, false, "json3");
	}
}

export class Answer
{
	public static Set(questionId: string, output:any, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): CHAOS.Portal.Client.ICallState<any>
	{
		if (serviceCaller == null)
			serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

		return serviceCaller.CallService("Answer/Set", CHAOS.Portal.Client.HttpMethod.Get, { questionId: questionId, output: JSON.stringify(output) }, false);
	}
}

export interface IQuestion
{
	Id:string;
	Type: string;
	Output: any;
	Data:{[key:string]:any};
}

Initialize();