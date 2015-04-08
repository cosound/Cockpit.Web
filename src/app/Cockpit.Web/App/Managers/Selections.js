define(["require", "exports", "knockout", "Managers/Authorization", "Managers/Portal", "Managers/Notification", "Data/Selection"], function (require, exports, knockout, Authorization, Portal, Notification, Selection) {
    exports.Selections = knockout.observableArray();
    exports.IsReady = knockout.observable(false);
    function Initialize() {
        Authorization.WhenAuthenticated(function () {
            Portal.Selection.Get().WithCallback(function (response) {
                if (response.Error != null) {
                    Notification.NotifyError("Failed to get selections: " + response.Error.Message);
                    return;
                }
                if (response.Body.Results.length > 0)
                    exports.Selections.push.apply(exports.Selections, response.Body.Results.map(function (s) { return new Selection(s, Delete); }));
                exports.IsReady(true);
            });
        });
    }
    function WhenReady(callback) {
        if (exports.IsReady())
            callback();
        else {
            var sub = exports.IsReady.subscribe(function () {
                sub.dispose();
                callback();
            });
        }
    }
    exports.WhenReady = WhenReady;
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
    function RemoveFromSelection(id, ids, callback) {
        if (callback === void 0) { callback = null; }
        Portal.Selection.DeleteItems(id, ids).WithCallback(function (response) {
            if (response.Error != null) {
                Notification.NotifyError("Error deleting items to selection: " + response.Error.Message);
                if (callback != null)
                    callback(false);
            }
            else {
                exports.Selections().some(function (selection) {
                    if (selection.Id !== id)
                        return false;
                    selection.RemoveItemsById(ids);
                    return true;
                });
                if (callback != null)
                    callback(true);
            }
        });
    }
    exports.RemoveFromSelection = RemoveFromSelection;
    function Delete(selection) {
        exports.Selections.remove(selection);
        Portal.Selection.Delete(selection.Id).WithCallback(function (response) {
            if (response.Error == null)
                return;
            Notification.NotifyError("Failed to delete selection: " + response.Error.Message);
            exports.Selections.push(selection);
            return;
        });
    }
    exports.Delete = Delete;
    Initialize();
});
