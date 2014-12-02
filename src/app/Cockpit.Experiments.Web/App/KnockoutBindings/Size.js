define(["require", "exports", "knockout"], function (require, exports, knockout) {
    knockout.bindingHandlers["Size"] = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor();
            value(element.getContext("2d"));
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        }
    };
});
//# sourceMappingURL=Size.js.map