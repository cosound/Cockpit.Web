import CallRepeater = require("Managers/CallRepeater");

class CallQueue
{
	private _queues:{[id:string]:CallRepeater[]} = {};

	public Queue(id:string, call:CallRepeater):void
	{
		if (this._queues.hasOwnProperty(id))
		{
			this._queues[id].push(call);
		} else
		{
			this._queues[id] = [call];
			call.Call(() => this.CallNext(id));
		}
	}

	private CallNext(id:string):void
	{
		var queue = this._queues[id];

		queue.shift();

		if (queue.length === 0)
			delete this._queues[id];
		else
			queue[0].Call(() => this.CallNext(id));
	}
}

export = CallQueue;