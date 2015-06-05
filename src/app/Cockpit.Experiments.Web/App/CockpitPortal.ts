import Portal = require("Portal");
import Configuration = require("Configuration");

export var Client:CHAOS.Portal.Client.IPortalClient;

function Initialize():void
{
	Client = CHAOS.Portal.Client.Initialize(Configuration.PortalPath);
}

export class Experiment
{
	public static Get(id: string, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null):CHAOS.Portal.Client.ICallState<CockpitResults<IExperiment>>
	{
		if (serviceCaller == null)
			serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

		return serviceCaller.CallService("Experiment/Get", CHAOS.Portal.Client.HttpMethod.Get, { id: id }, false);
	}

	public static Next(listId: string, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): CHAOS.Portal.Client.ICallState<CockpitResults<IExperimentClaim>>
	{
		if (serviceCaller == null)
			serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

		return serviceCaller.CallService("Experiment/Next", CHAOS.Portal.Client.HttpMethod.Get, { listId: listId }, false);
	}
}

export class Slide
{
	public static Completed(questionaireId: string, slideIndex: number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): CHAOS.Portal.Client.ICallState<CockpitResults<any>>
	{
		if (serviceCaller == null)
			serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

		return serviceCaller.CallService("Slide/Completed", CHAOS.Portal.Client.HttpMethod.Get, { questionaireId: questionaireId, slideIndex: slideIndex }, false);
	}
}

export class Question
{
	public static Get(id: string, index: number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): CHAOS.Portal.Client.ICallState<CockpitResults<IQuestion>>
	{
		if (serviceCaller == null)
			serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

		return serviceCaller.CallService("Question/Get", CHAOS.Portal.Client.HttpMethod.Get, { id: id, index: index}, false, "json3");
	}
}

export class Answer
{
	public static Set(questionId: string, output: any, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): CHAOS.Portal.Client.ICallState<CHAOS.Portal.Client.IPagedPortalResult<any>>
	{
		if (serviceCaller == null)
			serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

		return serviceCaller.CallService("Answer/Set", CHAOS.Portal.Client.HttpMethod.Post, { questionId: questionId, output: JSON.stringify(output) }, false);
	}
}

export interface IExperiment
{
	Id: string;
	Name: string;
	FooterLabel: string;
	Css: string;
	Version: string;
	LockQuestion:boolean;
	EnablePrevious: boolean;
	CurrentSlideIndex: number;
}

export interface IExperimentClaim
{
	Id: string;
	ClaimedOnDate:string;
}

export interface CockpitResults<T>
{
	Count:number;
	FoundCount:number;
	StartIndex: number;
	Results: T[];
}

export interface IQuestion
{
	Id:string;
	Type: string;
	Input:any[];
	Output: any;
}

export interface IQuestionEvent
{
	Id: string;
	Type: string;
	Method: string;
	Data: string;
	DateTime:Date;
}

Initialize();