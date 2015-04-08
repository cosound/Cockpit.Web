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
        Search.Get = function (query, tag, facets, pageIndex, pageSize) {
            return exports.ServiceCaller.CallService("Search/Get", 0 /* Get */, { q: query, tag: tag, facets: facets, pageIndex: pageIndex, pageSize: pageSize }, true);
        };
        return Search;
    })();
    exports.Search = Search;
    Initialize();
});
