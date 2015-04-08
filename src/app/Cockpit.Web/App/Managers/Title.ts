import knockout = require("knockout");

export var Title: KnockoutObservable<string>;
var isDefault: boolean = true;

var _defaultName:string = "Cockpit";

export function ToDefault(subName:string = null):void
{
	Title((subName == null ? "" : subName + " - ") + _defaultName);
	isDefault = true;
}

function Initialize():void
{
	Title = knockout.observable(_defaultName);
	Title.subscribe(v =>
	{
		document.title = v;
		isDefault = false;
	});
}

Initialize();