import knockout = require("knockout");
import Notification = require("Managers/Notification");
import Portal = require("Managers/Portal");
import Title = require("Managers/Title");
import Selections = require("Managers/Selections");
import Selection = require("Data/Selection");
import SearchResult = require("Data/SearchResult");

class Search
{
	public Query: KnockoutObservable<string> = knockout.observable("");
	public SearchResults: KnockoutObservableArray<SearchResult> = knockout.observableArray<SearchResult>();

	public SelectedSelection: KnockoutObservable<Selection> = knockout.observable<Selection>(null);
	public Selections: KnockoutObservableArray<Selection>;
	public CanAddToSelection:KnockoutComputed<boolean>;

	constructor(selectionId:string)
	{
		Title.ToDefault("Search");
		this.Selections = Selections.Selections;
		this.CanAddToSelection = knockout.computed(() => this.SelectedSelection() != null);
		this.SelectedSelection.subscribe(s => this.UpdateSelections(s));
	}

	private UpdateSelections(selection:Selection = null):void
	{
		selection = selection || this.SelectedSelection();

		this.SearchResults().forEach(s => s.IsSelected(selection != null && selection.Items[s.Id] == true));
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
				this.SearchResults.push.apply(this.SearchResults, response.Body.Results.map(r => new SearchResult(r)));

			this.Query("");
			this.UpdateSelections();
		});
	}

	public AddToSelection():void
	{
		if (!this.CanAddToSelection()) return;

		var results = this.SearchResults().filter(s => s.IsSelected());

		Selections.AddToSelection(this.SelectedSelection().Id, results.map(s => s.Id));
	}
}

export = Search;