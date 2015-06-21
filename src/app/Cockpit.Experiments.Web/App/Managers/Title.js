define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var Title = (function () {
        function Title() {
            var _this = this;
            this.isDefault = true;
            this.Title = knockout.observable(Title.defaultName);
            this.Title.subscribe(function (v) {
                document.title = v;
                _this.isDefault = false;
            });
        }
        Title.prototype.ToDefault = function (subName) {
            if (subName === void 0) { subName = null; }
            this.Title((subName == null ? "" : subName + " - ") + Title.defaultName);
            this.isDefault = true;
        };
        Title.defaultName = document.title;
        return Title;
    })();
    var instance = new Title();
    return instance;
});
