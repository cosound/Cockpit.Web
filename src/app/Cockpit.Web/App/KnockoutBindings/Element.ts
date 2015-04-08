import knockout = require("knockout");

knockout.bindingHandlers["Element"] = {
	init: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) =>
	{
		var value: KnockoutObservable<CanvasRenderingContext2D> = valueAccessor();
		value(element);
	},
	update: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) =>
	{

	}
}; 