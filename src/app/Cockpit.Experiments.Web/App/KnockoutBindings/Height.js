define(["require", "exports", "knockout"], function (require, exports, knockout) {
    knockout.bindingHandlers["Height"] = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor();
            if (typeof value == "function")
                value(element.offsetHeight);
            else if (value.Value) {
                if (!value.Max || value.Value() < element.offsetHeight)
                    value.Value(element.offsetHeight);
            }
            else
                throw new Error("Invalid configuration of Height binding: " + value);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        }
    };
});
