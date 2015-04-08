import knockout = require("knockout");
import jquery = require("jquery");

knockout.bindingHandlers["Tooltip"] = {
	update: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) => 
	{
		var $element: JQuery, options: TooltipOptions, tooltip: any;
		options = knockout.utils.unwrapObservable(valueAccessor());
		$element = jquery(element);
		tooltip = $element.data('tooltip');

		if (tooltip)
			jquery.extend(tooltip.options, options);
		else
			$element.tooltip(options);
	}
}; 