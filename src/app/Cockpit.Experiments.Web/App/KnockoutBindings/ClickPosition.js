define(["require", "exports", "knockout", "jquery"], function (require, exports, knockout, jquery) {
    knockout.bindingHandlers["ClickPosition"] = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor();
            var $element = jquery(element);
            jquery(element).click(function (event) { return value.call(viewModel, event.pageX - $element.position().left, event.pageY - $element.position().top); });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        }
    };
});
