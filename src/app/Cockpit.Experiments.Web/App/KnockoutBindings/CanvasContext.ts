import knockout = require("knockout");
import jquery = require("jquery");

knockout.bindingHandlers["CanvasContext"] = {
	init: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) =>
	{
		var value: KnockoutObservable<CanvasRenderingContext2D> = valueAccessor();
		value(element.getContext("2d"));
	},
	update: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) =>
	{
		
	}
};