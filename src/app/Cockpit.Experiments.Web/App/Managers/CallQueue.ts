import CallRepeater = require("Managers/CallRepeater");

class CallQueue
{
	private _queues: { [id: string]: CallRepeater[] } = {};
	private _onlyCallLast: boolean;

	constructor(onlyCallLast:boolean)
	{
		this._onlyCallLast = onlyCallLast;
	}

	public Queue(id:string, call:CallRepeater):void
	{
		if (this._queues.hasOwnProperty(id))
		{
			this._queues[id].push(call);
		} else
		{
			this._queues[id] = [call];
			call.Call(s => this.CallNext(id, 1, s));
		}
	}

	private CallNext(id:string, count:number, success:boolean):void
	{
		var queue = this._queues[id];

		if (queue.length === 1)
		{
			delete this._queues[id];
			return;
		}

		var completed = queue.splice(0, count);
		completed.pop(); //Last call is the one just completed
		completed.forEach(c => c.Complete(success, false));
		
		if (queue.length === 0)
			delete this._queues[id];
		else
		{
			var newCount = queue.length;
			queue[newCount - 1].Call(s => this.CallNext(id, newCount, s));
		}
			
	}
}

export = CallQueue;