define(["require", "exports", "knockout"], function (require, exports, knockout) {
    knockout.bindingHandlers["Height"] = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor();
            value(element.height);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        }
    };
});
//# sourceMappingURL=Height.js.map