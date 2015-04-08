define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var Selection = (function () {
        function Selection(data, deleteCallback) {
            this.Items = {};
            this.Id = data.Id;
            this.Name = knockout.observable(data.Name);
            this._deleteCallback = deleteCallback;
            this.AddItems(data.Items);
        }
        Selection.prototype.AddItems = function (items) {
            var _this = this;
            items.forEach(function (i) { return _this.Items[i.Id] = true; });
        };
        Selection.prototype.AddItemsById = function (ids) {
            var _this = this;
            ids.forEach(function (id) { return _this.Items[id] = true; });
        };
        Selection.prototype.Delete = function () {
            this._deleteCallback(this);
        };
        return Selection;
    })();
    return Selection;
});
