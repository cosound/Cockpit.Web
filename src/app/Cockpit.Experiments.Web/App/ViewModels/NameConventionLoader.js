define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var NameConventionLoader = (function () {
        function NameConventionLoader(prefix) {
            this._prefix = prefix;
        }
        NameConventionLoader.prototype.getConfig = function (componentName, callback) {
            if (componentName.indexOf(this._prefix + "-") != 0)
                componentName = this._prefix + "-" + componentName;

            knockout.components.register(componentName, {});

            var fileName = componentName.replace(this._prefix + "-", "").replace("-", "/");

            callback({
                viewModel: { require: "ViewModels/" + fileName },
                template: { require: "text!Views/" + fileName + ".html" }
            });
        };
        return NameConventionLoader;
    })();

    
    return NameConventionLoader;
});
//# sourceMappingURL=NameConventionLoader.js.map
