import knockout = require("knockout");
import SearchResult = require("ViewModels/Search/SearchResult");
import Selection = require("ViewModels/Selections/Selection");

export var Selections: KnockoutObservableArray<Selection> = knockout.observableArray<Selection>();

export function SetNewSelectionResults(results:Array<SearchResult>):void
{
	Selections.unshift(new Selection(null, results));
}