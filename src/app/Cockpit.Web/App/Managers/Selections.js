define(["require", "exports", "knockout", "Managers/Authorization", "Managers/Portal", "Managers/Notification"], function (require, exports, knockout, Authorization, Portal, Notification) {
    exports.Selections = knockout.observableArray();
    function Initialize() {
        Authorization.WhenAuthenticated(function () {
            Portal.Selection.Get("c375e8d2-64a3-4bb9-9b96-6f8ba7862d81").WithCallback(function (response) {
                if (response.Error != null) {
                    Notification.NotifyError("Failed to get selections: " + response.Error.Message);
                    return;
                }
                if (response.Body.Results.length > 0)
                    exports.Selections.push.apply(exports.Selections, response.Body.Results);
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
                exports.Selections.push(response.Body.Results[0]);
                callback(true);
            }
        });
    }
    exports.Create = Create;
    Initialize();
});
