define(["require", "exports", "Configuration"], function(require, exports, Configuration) {
    exports.Client;

    function Initialize() {
        exports.Client = CHAOS.Portal.Client.Initialize(Configuration.PortalPath);
    }

    var Questionnaire = (function () {
        function Questionnaire() {
        }
        Questionnaire.Get = function (id, serviceCaller) {
            if (typeof serviceCaller === "undefined") { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

            return serviceCaller.CallService("Questionnaire/Get", 0 /* Get */, { id: id }, false);
        };
        return Questionnaire;
    })();
    exports.Questionnaire = Questionnaire;

    Initialize();
});
//# sourceMappingURL=CockpitPortal.js.map
