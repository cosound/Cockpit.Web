import knockout = require("knockout");
import Authorization = require("Managers/Authorization");
import Portal = require("Managers/Portal");
import Notification = require("Managers/Notification");
import Selection = require("Data/Selection");

export var Selections: KnockoutObservableArray<Selection> = knockout.observableArray<Selection>();
export var IsReady:KnockoutObservable<boolean> = knockout.observable(false);

function Initialize():void
{
	Authorization.WhenAuthenticated(() =>
	{
		Portal.Selection.Get().WithCallback(response =>
		{
			if (response.Error != null)
			{
				Notification.NotifyError("Failed to get selections: " + response.Error.Message);
				return;
			}

			if (response.Body.Results.length > 0)
				Selections.push.apply(Selections, response.Body.Results.map(s => new Selection(s, Delete)));

			IsReady(true);
		});
	});
}

export function WhenReady(callback:() => void):void
{
	if (IsReady())
		callback();
	else
	{
		var sub = IsReady.subscribe(() =>
		{
			sub.dispose();
			callback();
		});
	}
}

export function Create(name:string, callback:(success:boolean)=>void):void
{
	Portal.Selection.Set({ Name: name, Items: [] }).WithCallback(response =>
	{
		if (response.Error != null)
		{
			Notification.NotifyError("Error creating new Selection: " + response.Error.Message);
			callback(false);
		} else
		{
			Selections.push(new Selection(response.Body.Results[0], Delete));
			callback(true);
		}
	});
}

export function AddToSelection(id: string, ids: string[], callback: (success: boolean) => void = null):void
{
	Portal.Selection.AddItems(id, ids).WithCallback(response =>
	{
		if (response.Error != null)
		{
			Notification.NotifyError("Error adding items to selection: " + response.Error.Message);
			if(callback != null) callback(false);
		} else
		{
			Selections().some(selection =>
			{
				if (selection.Id != id) return false;
				selection.AddItemsById(ids);
				return true;
			});
			if (callback != null) callback(true);
		}
	});
}

export function RemoveFromSelection(id: string, ids: string[], callback: (success: boolean) => void = null): void
{
	Portal.Selection.DeleteItems(id, ids).WithCallback(response =>
	{
		if (response.Error != null)
		{
			Notification.NotifyError("Error deleting items to selection: " + response.Error.Message);
			if (callback != null) callback(false);
		} else
		{
			Selections().some(selection =>
			{
				if (selection.Id !== id) return false;
				selection.RemoveItemsById(ids);
				return true;
			});
			if (callback != null) callback(true);
		}
	});
}

export function Delete(selection:Selection):void
{
	Selections.remove(selection);

	Portal.Selection.Delete(selection.Id).WithCallback(response =>
	{
		if (response.Error == null) return;

		Notification.NotifyError("Failed to delete selection: " + response.Error.Message);
		Selections.push(selection);
		return;
	});
}

Initialize();