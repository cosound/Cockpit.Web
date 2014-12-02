import knockout = require("knockout");

knockout.bindingHandlers["Width"] = {
	init: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) =>
	{
		var value: KnockoutObservable<number> = valueAccessor();
		value(element.width);
	},
	update: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) =>
	{

	}
}; 