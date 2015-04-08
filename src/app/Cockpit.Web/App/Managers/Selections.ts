import knockout = require("knockout");
import Authorization = require("Managers/Authorization");
import Portal = require("Managers/Portal");
import Notification = require("Managers/Notification");

export var Selections: KnockoutObservableArray<Portal.ISelection> = knockout.observableArray<Portal.ISelection>();

function Initialize():void
{
	Authorization.WhenAuthenticated(() =>
	{
		Portal.Selection.Get("c375e8d2-64a3-4bb9-9b96-6f8ba7862d81").WithCallback(response =>
		{
			if (response.Error != null)
			{
				Notification.NotifyError("Failed to get selections: " + response.Error.Message);
				return;
			}

			if (response.Body.Results.length > 0)
				Selections.push.apply(Selections, response.Body.Results);
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
			Selections.push(response.Body.Results[0]);
			callback(true);
		}
	});
}

export function AddToSelection(id: string, items: Portal.ISelectionItem[], callback: (success: boolean) => void):void
{
	Portal.Selection.AddItems(id, items).WithCallback(response =>
	{
		if (response.Error != null)
		{
			Notification.NotifyError("Error adding items to selection: " + response.Error.Message);
			callback(false);
		} else
		{
			Selections().some(s =>
			{
				if (s.Id != id) return false;
				s.Items.push.apply(s.Items, items);
				return true;
			});
			callback(true);
		}
	});
}

Initialize();