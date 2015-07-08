import Notification = require("Managers/Notification");

type CallerCalback = (sucess: boolean, fatal: boolean) => void;
type Caller = (callback: CallerCalback) => void;
type ExternalCallback = (success:boolean) => void;

class CallRepeater
{
	private _caller: Caller;
	private _callback: ExternalCallback;
	private _repeatWaitPeriod: number = 500;
	private _completedCallback:()=>void;

	constructor(caller:Caller, callback:ExternalCallback)
	{
		this._callback = callback;
		this._caller = caller;
	}

	public Call(completedCallback:()=>void):void
	{
		if (completedCallback == null) throw new Error("completedCallback must not be null");
		if (this._completedCallback != null) throw new Error("Call already invoked");
		this._completedCallback = completedCallback;
		this._caller((s, f) => this.CallCompleted(s, f));
	}

	private CallCompleted(success:boolean, fatal:boolean):void
	{
		if (success)
		{
			this._completedCallback();
			this._callback(true);
		}
		else if (fatal)
		{
			this._completedCallback();
			this._callback(false);
		}
		else
		{
			Notification.Debug(`Call failed, repeating in ${this._repeatWaitPeriod} milliseconds`);

			setTimeout(() => this._caller((s, f) => this.CallCompleted(s, f)), this._repeatWaitPeriod);
			this._repeatWaitPeriod *= 2;
		}
	}
}

export = CallRepeater;