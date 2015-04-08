import knockout = require("knockout");
import Portal = require("Managers/Portal"); 

class Selection
{
	public Id:string;
	public Name: KnockoutObservable<string>;
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
		console.log(items[0].Id);

		items.forEach(i => this.Items[i.Id] = true);

		console.log(this.Items);
	}

	public AddItemsById(ids: string[]): void
	{
		ids.forEach(id => this.Items[id] = true);
	}

	public Delete():void
	{
		this._deleteCallback(this);
	}
}

export = Selection;