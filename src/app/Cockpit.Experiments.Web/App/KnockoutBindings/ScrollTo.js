define(["require", "exports", "knockout"], function (require, exports, knockout) {
    knockout.bindingHandlers["ScrollTo"] = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor();
            var $element = jQuery(element);
            var $document = jQuery("html, body");
            value(function (duration) {
                $document.animate({ scrollTop: $element.offset().top }, duration);
            });
        }
    };
});
