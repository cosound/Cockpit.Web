import knockout = require("knockout");

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