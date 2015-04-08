define(["require", "exports", "knockout"], function (require, exports, knockout) {
    knockout.bindingHandlers["Element"] = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor();
            value(element);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        }
    };
});
