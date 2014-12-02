import knockout = require("knockout");

knockout.bindingHandlers["Height"] = {
	init: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) =>
	{
		var value: KnockoutObservable<number> = valueAccessor();
		value(element.height);
	},
	update: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) =>
	{

	}
}; 