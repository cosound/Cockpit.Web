define(["require", "exports", "knockout"], function (require, exports, knockout) {
    knockout.bindingHandlers["Width"] = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor();
            value(element.width);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        }
    };
});
