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
	public CanUpdateSelection: KnockoutComputed<boolean>;
	public CanSelectSearchHits: KnockoutComputed<boolean>;
	public CanLoadMore: KnockoutComputed<boolean>;
	public TotalNumberOfResults:KnockoutObservable<number> = knockout.observable(0);

	private _lastQuery:string;
	private _pageIndex:KnockoutObservable < number > = knockout.observable(0);
	private _pageSize:number = 10;

	constructor(selectionId:string)
	{
		Title.ToDefault("Search");
		this.Selections = Selections.Selections;
		this.CanUpdateSelection = knockout.computed(() => this.SelectedSelection() != null);
		this.CanSelectSearchHits = this.CanUpdateSelection;
		this.CanLoadMore = knockout.computed(() => this.TotalNumberOfResults() > (this._pageIndex() + 1) * this._pageSize);

		this.SelectedSelection.subscribe(s => this.UpdateSelections(s));
	}

	private UpdateSelections(selection:Selection = null, searchResults:SearchResult[] = null):void
	{
		selection = selection || this.SelectedSelection();
		searchResults = searchResults || this.SearchResults();

		searchResults.forEach(s => s.SetSavedState(selection != null && selection.Items[s.Id]));
	}

	public Search():void
	{
		this.SearchResults.removeAll();

		this._lastQuery = this.Query();
		this.TotalNumberOfResults(0);
		this._pageIndex(0);

		this.InnerSearch(this._lastQuery, this._pageIndex(), this._pageSize, (r, t) =>
		{
			this.SearchResults.removeAll();
			this.SearchResults.push.apply(this.SearchResults, r);
			this.TotalNumberOfResults(t);
		});
	}

	public LoadMore(): void
	{
		this._pageIndex(this._pageIndex() + 1);
		this.InnerSearch(this._lastQuery, this._pageIndex(), this._pageSize, r => this.SearchResults.push.apply(this.SearchResults, r));
	}

	private InnerSearch(query:string, index:number, size:number, callback:(results:SearchResult[], totalCount:number)=>void):void
	{
		Portal.Search.Simple(query, index, size).WithCallback(response =>
		{
			if (response.Error != null)
			{
				Notification.NotifyError("Failed to get search: " + response.Error.Message);
				return;
			}

			var results = response.Body.Results.map(r => new SearchResult(r, this.CanSelectSearchHits));

			this.UpdateSelections(null, results);

			callback(results, response.Body.TotalCount);
		});
	}

	public UpdateSelection():void
	{
		if (!this.CanUpdateSelection()) return;

		var changedResults = this.SearchResults().filter(s => s.HasChanges());
		var addResults = changedResults.filter(s => s.IsSelected());
		var removeResults = changedResults.filter(s => !s.IsSelected());

		if(addResults.length !== 0)
			Selections.AddToSelection(this.SelectedSelection().Id, addResults.map(s => s.Id), success =>
			{
				if (success) this.UpdateSelections(null, addResults);
			});
		if (removeResults.length !== 0)
			Selections.RemoveFromSelection(this.SelectedSelection().Id, removeResults.map(s => s.Id), success =>
			{
				if (success) this.UpdateSelections(null, removeResults);
			});
	}
}

export = Search;