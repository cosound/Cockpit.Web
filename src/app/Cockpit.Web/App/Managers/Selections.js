define(["require", "exports", "knockout", "Managers/Authorization", "Managers/Portal", "Managers/Notification", "Data/Selection"], function (require, exports, knockout, Authorization, Portal, Notification, Selection) {
    exports.Selections = knockout.observableArray();
    function Initialize() {
        Authorization.WhenAuthenticated(function () {
            Portal.Selection.Get("cdeaa42f-1d41-483c-b7d1-e2ed5e98d7f4").WithCallback(function (response) {
                if (response.Error != null) {
                    Notification.NotifyError("Failed to get selections: " + response.Error.Message);
                    return;
                }
                if (response.Body.Results.length > 0)
                    exports.Selections.push.apply(exports.Selections, response.Body.Results.map(function (s) { return new Selection(s, Delete); }));
            });
        });
    }
    function Create(name, callback) {
        Portal.Selection.Set({ Name: name, Items: [] }).WithCallback(function (response) {
            if (response.Error != null) {
                Notification.NotifyError("Error creating new Selection: " + response.Error.Message);
                callback(false);
            }
            else {
                exports.Selections.push(new Selection(response.Body.Results[0], Delete));
                callback(true);
            }
        });
    }
    exports.Create = Create;
    function AddToSelection(id, ids, callback) {
        if (callback === void 0) { callback = null; }
        Portal.Selection.AddItems(id, ids).WithCallback(function (response) {
            if (response.Error != null) {
                Notification.NotifyError("Error adding items to selection: " + response.Error.Message);
                if (callback != null)
                    callback(false);
            }
            else {
                exports.Selections().some(function (selection) {
                    if (selection.Id != id)
                        return false;
                    selection.AddItemsById(ids);
                    return true;
                });
                if (callback != null)
                    callback(true);
            }
        });
    }
    exports.AddToSelection = AddToSelection;
    function Delete(selection) {
        var _this = this;
        this.Selections.remove(selection);
        Portal.Selection.Delete(selection.Id).WithCallback(function (response) {
            if (response.Error == null)
                return;
            Notification.NotifyError("Failed to delete selection: " + response.Error.Message);
            _this.Selections.push(selection);
            return;
        });
    }
    exports.Delete = Delete;
    Initialize();
});
