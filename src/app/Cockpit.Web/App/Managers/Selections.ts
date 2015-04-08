import knockout = require("knockout");
import Authorization = require("Managers/Authorization");
import Portal = require("Managers/Portal");
import Notification = require("Managers/Notification");
import Selection = require("Data/Selection");

export var Selections: KnockoutObservableArray<Selection> = knockout.observableArray<Selection>();

function Initialize():void
{
	Authorization.WhenAuthenticated(() =>
	{
		Portal.Selection.Get("cdeaa42f-1d41-483c-b7d1-e2ed5e98d7f4").WithCallback(response =>
		{
			if (response.Error != null)
			{
				Notification.NotifyError("Failed to get selections: " + response.Error.Message);
				return;
			}

			if (response.Body.Results.length > 0)
				Selections.push.apply(Selections, response.Body.Results.map(s => new Selection(s, Delete)));
		});
	});
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

export function Delete(selection:Selection):void
{
	this.Selections.remove(selection);

	Portal.Selection.Delete(selection.Id).WithCallback(response =>
	{
		if (response.Error == null) return;

		Notification.NotifyError("Failed to delete selection: " + response.Error.Message);
		this.Selections.push(selection);
		return;
	});
}

Initialize();