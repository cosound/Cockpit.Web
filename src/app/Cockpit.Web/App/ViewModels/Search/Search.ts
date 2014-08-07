/// <amd-dependency path="less!Styles/Search" />

import knockout = require("knockout");
import Navigation = require("Navigation");
import SelectionManager = require("SelectionManager");
import SearchResult = require("ViewModels/Search/SearchResult");

class Search
{
	public Query: KnockoutObservable<string> = knockout.observable<string>("");
	public Results: KnockoutObservableArray<SearchResult> = knockout.observableArray<SearchResult>();
	public SelectedSearchResults: KnockoutObservableArray<SearchResult> = knockout.observableArray<SearchResult>();
	public HighlightedSearchResult: KnockoutObservable<SearchResult> = knockout.observable<SearchResult>();
	
	public Search():void
	{
		this.Results.removeAll();

		for (var i = 0; i < 10; i++)
		{
			var result = new SearchResult(this.Query() + " Result " + i, new Date(Math.random() * 1000000000000));
			this.ListenToResult(result);
			this.Results.push(result);
		}
	}

	public CreateSelection():void
	{
		var selectedResults = new Array<SearchResult>();

		for (var i = 0; i < this.Results().length; i++)
		{
			var result = this.Results()[i];
			if (result.Selected())
				selectedResults.push(result);
		}

		SelectionManager.SetNewSelectionResults(selectedResults);

		Navigation.Navigate("Selections");
	}

	private ListenToResult(searchResult:SearchResult):void
	{
		searchResult.SetSelector(s => this.SearchResultHighlighted(s));
		searchResult.Selected.subscribe(s => this.SearchResultSelected(searchResult));
	}

	private SearchResultSelected(searchResult:SearchResult):void
	{
		var isInSelected = this.SelectedSearchResults.indexOf(searchResult) != -1;

		if (searchResult.Selected())
		{
			if (!isInSelected) this.SelectedSearchResults.push(searchResult);
		} else
		{
			if (isInSelected) this.SelectedSearchResults.remove(searchResult);
		}
	}

	private SearchResultHighlighted(searchResult:SearchResult):void
	{
		this.HighlightedSearchResult(searchResult);
	}
}

export = Search;