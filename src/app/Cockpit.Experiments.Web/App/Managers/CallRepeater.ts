import Notification = require("Managers/Notification");

type CallerCalback = (sucess: boolean, fatal: boolean) => void;
type Caller = (callback: CallerCalback) => void;
type ExternalCallback = (success:boolean) => void;

class CallRepeater
{
	private _caller: Caller;
	private _callback: ExternalCallback;
	private _repeatWaitPeriod: number = 500;
	private _completedCallback: ExternalCallback;

	constructor(caller:Caller, callback:ExternalCallback)
	{
		this._callback = callback;
		this._caller = caller;
	}

	public Call(completedCallback: ExternalCallback):void
	{
		if (completedCallback == null) throw new Error("completedCallback must not be null");
		if (this._completedCallback != null) throw new Error("Call already invoked");
		this._completedCallback = completedCallback;
		this._caller((s, f) => this.CallCompleted(s, f));
	}

	public Complete(success:boolean, invokeCompleted:boolean = true):void
	{
		if (invokeCompleted) this._completedCallback(success);
		this._callback(success);
	}

	private CallCompleted(success:boolean, fatal:boolean):void
	{
		if (success)
			this.Complete(true);
		else if (fatal)
			this.Complete(false);
		else
		{
			Notification.Debug(`Call failed, repeating in ${this._repeatWaitPeriod} milliseconds`);

			setTimeout(() => this._caller((s, f) => this.CallCompleted(s, f)), this._repeatWaitPeriod);
			this._repeatWaitPeriod *= 2;
		}
	}
}

export = CallRepeater;