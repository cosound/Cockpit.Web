import knockout = require("knockout");
import SearchResult = require("ViewModels/Search/SearchResult");

var results:Array<SearchResult>;

export function SetNewSelectionResults(results:Array<SearchResult>):void
{
	this.results = results;
}

export function GetNewSelectionResults():Array<SearchResult>
{
	return results;
}