define(["require", "exports", "knockout", "Portal", "Managers/Configuration"], function (require, exports, knockout, Portal, Configuration) {
    exports.Client;
    exports.ServiceCaller;
    exports.HasSession = knockout.observable(false);
    function Initialize() {
        exports.Client = Portal.Initialize(Configuration.PortalServicePath, null, false);
        exports.ServiceCaller = exports.Client;
        exports.Client.SessionAcquired().Add(function () { return exports.HasSession(true); });
    }
    function WhenSessionIsAcquired(callback) {
        if (exports.HasSession())
            callback();
        else {
            var sub = exports.HasSession.subscribe(function () {
                sub.dispose();
                callback();
            });
        }
    }
    exports.WhenSessionIsAcquired = WhenSessionIsAcquired;
    var Search = (function () {
        function Search() {
        }
        Search.Simple = function (query, pageIndex, pageSize) {
            return exports.ServiceCaller.CallService("Search/Simple", 0 /* Get */, { q: query, pageIndex: pageIndex, pageSize: pageSize }, true);
        };
        return Search;
    })();
    exports.Search = Search;
    var Selection = (function () {
        function Selection() {
        }
        Selection.Get = function (id) {
            if (id === void 0) { id = null; }
            return exports.ServiceCaller.CallService("Selection/Get", 0 /* Get */, { id: id }, true);
        };
        Selection.Set = function (selection) {
            return exports.ServiceCaller.CallService("Selection/Set", 1 /* Post */, { selection: JSON.stringify(selection) }, true);
        };
        Selection.Delete = function (id) {
            return exports.ServiceCaller.CallService("Selection/Delete", 0 /* Get */, { id: id }, true);
        };
        Selection.AddItems = function (id, items) {
            return exports.ServiceCaller.CallService("Selection/AddItems", 1 /* Post */, { id: id, items: items }, true);
        };
        Selection.DeleteItems = function (id, items) {
            return exports.ServiceCaller.CallService("Selection/DeleteItems", 1 /* Post */, { id: id, items: items }, true);
        };
        return Selection;
    })();
    exports.Selection = Selection;
    Initialize();
});
