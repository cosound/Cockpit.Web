import jquery = require("jquery");
import knockout = require("knockout");

knockout.bindingHandlers["ScrollTo"] = {
	init: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) =>
	{
		
	},
	update: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) =>
	{
		var value: KnockoutObservable<(duration:number)=>void> = valueAccessor();

		var $element = jQuery(element);
		var $document = jQuery("html, body");

		value(duration =>
		{
			$document.animate({scrollTop: $element.offset().top}, duration);
		});
	}
};