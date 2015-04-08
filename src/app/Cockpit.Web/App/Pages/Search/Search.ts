import knockout = require("knockout");
import Notification = require("Managers/Notification");
import Portal = require("Managers/Portal");
import Title = require("Managers/Title");
import Selections = require("Managers/Selections");

type SearchResult = { Id:string; Title:string; IsSelected:KnockoutObservable<boolean>};

class Search
{
	public Query: KnockoutObservable<string> = knockout.observable("");
	public SearchResults: KnockoutObservableArray<SearchResult> = knockout.observableArray<SearchResult>();

	public SelectedSelection: KnockoutObservable<Portal.ISelection> = knockout.observable<Portal.ISelection>(null);
	public Selections: KnockoutObservableArray<Portal.ISelection>;
	public CanAddToSelection:KnockoutComputed<boolean>;

	constructor(selectionId:string)
	{
		Title.ToDefault("Search");
		this.Selections = Selections.Selections;
		this.CanAddToSelection = knockout.computed(() => this.SelectedSelection() != null);
	}

	public Search():void
	{
		this.SearchResults.removeAll();

		Portal.Search.Simple(this.Query(), 0, 10).WithCallback(response =>
		{
			this.SearchResults.removeAll();

			if (response.Error != null)
			{
				Notification.NotifyError("Failed to get search: " + response.Error.Message);
				return;
			}

			if (response.Body.Results.length > 0)
				this.SearchResults.push.apply(this.SearchResults, response.Body.Results.map(r => this.CreateSearchResult(r)));

			this.Query("");
		});
	}

	private CreateSearchResult(data:Portal.ISearchResult):SearchResult
	{
		return {
			Id: data.Id,
			Title: data.Title,
			IsSelected: knockout.observable(false)
		};
	}

	public AddToSelection():void
	{
		if (!this.CanAddToSelection()) return;

		var results = this.SearchResults().filter(s => s.IsSelected());

		var items = results.map(s => ({ Id: s.Id, Title: s.Title }));

		Selections.AddToSelection(this.SelectedSelection().Id, items, success =>
		{
			if (success) results.forEach(r => r.IsSelected(false));
		});
	}
}

export = Search;