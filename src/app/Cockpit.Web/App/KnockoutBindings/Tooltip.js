define(["require", "exports", "knockout", "jquery"], function (require, exports, knockout, jquery) {
    knockout.bindingHandlers["Tooltip"] = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var $element, options, tooltip;
            options = knockout.utils.unwrapObservable(valueAccessor());
            $element = jquery(element);
            tooltip = $element.data('tooltip');
            if (tooltip)
                jquery.extend(tooltip.options, options);
            else
                $element.tooltip(options);
        }
    };
});
