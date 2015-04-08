import knockout = require("knockout");
import Portal = require("Managers/Portal"); 

class Selection
{
	public Id:string;
	public Name: KnockoutObservable<string>;
	public Count:KnockoutObservable<number> = knockout.observable(0);
	public Items:{[key:string]:boolean} = {};

	private _deleteCallback:(selection:Selection)=>void;

	constructor(data:Portal.ISelection, deleteCallback:(selection:Selection)=>void)
	{
		this.Id = data.Id;
		this.Name = knockout.observable(data.Name);
		this._deleteCallback = deleteCallback;

		this.AddItems(data.Items);
	}

	public AddItems(items:Portal.ISelectionItem[]):void
	{
		items.forEach(i => this.Items[i.Id] = true);
		this.Count(this.Count() + items.length);
	}

	public AddItemsById(ids: string[]): void
	{
		ids.forEach(id => this.Items[id] = true);
		this.Count(this.Count() + ids.length);
	}

	public RemoveItemsById(ids: string[]): void
	{
		ids.forEach(id => delete this.Items[id]);
		this.Count(this.Count() - ids.length);
	}

	public Delete():void
	{
		this._deleteCallback(this);
	}
}

export = Selection;