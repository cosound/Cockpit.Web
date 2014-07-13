import knockout = require("knockout");
import Page = require("ViewModels/Page");

export var CurrentPage: KnockoutObservable<Page> = knockout.observable<Page>();

export function Initialize(): void
{
	CurrentPage(new Page("Login"));
} 

export function Navigate(path:string):void
{
	CurrentPage(new Page(path));
}