define(["require", "exports", "knockout"], function (require, exports, knockout) {
    knockout.bindingHandlers["CanvasContext"] = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor();
            value(element.getContext("2d"));
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        }
    };
});
