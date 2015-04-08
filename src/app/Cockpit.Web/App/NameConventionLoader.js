define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var NameConventionLoader = (function () {
        function NameConventionLoader(prefix) {
            this._prefix = prefix;
        }
        NameConventionLoader.prototype.getConfig = function (componentName, callback) {
            if (componentName.indexOf(this._prefix + "-") != 0)
                componentName = this._prefix + "-" + componentName;
            knockout.components.register(componentName, {});
            var filePath = componentName.replace(this._prefix + "-", "").replace("-", "/");
            filePath += (filePath.lastIndexOf("/") == -1 ? "/" + filePath : filePath.substring(filePath.lastIndexOf("/")));
            callback({
                viewModel: { require: filePath },
                template: { require: "text!" + filePath + ".html" }
            });
        };
        return NameConventionLoader;
    })();
    return NameConventionLoader;
});
