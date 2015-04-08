import knockout = require("knockout");
import Portal = require("Managers/Portal");

class SearchResult
{
	public Id: string;
	public Title: string;
	public IsSelected: KnockoutObservable<boolean> = knockout.observable(false);
	public SavedIsSelected:KnockoutObservable<boolean> = knockout.observable(false);
	public CanToggleSelect: KnockoutComputed<boolean>;
	public HasChanges:KnockoutComputed<boolean>;

	constructor(data: Portal.ISearchResult, canToggleSelect:KnockoutComputed<boolean>)
	{
		this.Id = data.Id;
		this.Title = data.Title;
		this.CanToggleSelect = canToggleSelect;
		this.HasChanges = knockout.computed(() => this.IsSelected() !== this.SavedIsSelected());
	}

	public SetSavedState(isSelected:boolean):void
	{
		this.IsSelected(isSelected);
		this.SavedIsSelected(isSelected);
	}
}

export = SearchResult;