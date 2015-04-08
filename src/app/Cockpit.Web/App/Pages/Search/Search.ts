import knockout = require("knockout");
import Notification = require("Managers/Notification");
import Portal = require("Managers/Portal");
import Title = require("Managers/Title");
import Selections = require("Managers/Selections");

class Search
{
	public Query:KnockoutObservable<string> = knockout.observable("");
	public Selections: KnockoutObservableArray<Portal.ISelection>;
	public SearchResults: KnockoutObservableArray<Portal.ISearchResult> = knockout.observableArray<Portal.ISearchResult>();

	constructor(selectionId:string)
	{
		Title.ToDefault("Search");
		this.Selections = Selections.Selections;

		console.log(selectionId);
	}

	public Search():void
	{
		for (var i = 0; i < 20; i++)
		{
			this.SearchResults.push({ Id: i.toString(), Title: this.Query() + "_" + i });
		}

		this.Query("");
	}
}

export = Search;