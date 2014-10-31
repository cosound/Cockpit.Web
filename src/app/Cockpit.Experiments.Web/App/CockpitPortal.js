define(["require", "exports", "Configuration"], function(require, exports, Configuration) {
    exports.Client;

    function Initialize() {
        exports.Client = CHAOS.Portal.Client.Initialize(Configuration.PortalPath);
    }

    var Questionnaire = (function () {
        function Questionnaire() {
        }
        Questionnaire.Get = function (id, index, serviceCaller) {
            if (typeof serviceCaller === "undefined") { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

            return serviceCaller.CallService("Questionnaire/Get", 0 /* Get */, { id: id, index: index }, false);
        };
        return Questionnaire;
    })();
    exports.Questionnaire = Questionnaire;

    var Answer = (function () {
        function Answer() {
        }
        Answer.Set = function (questionId, answer, serviceCaller) {
            if (typeof serviceCaller === "undefined") { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

            return serviceCaller.CallService("Answer/Set", 0 /* Get */, { questionId: questionId, answer: answer }, false);
        };
        return Answer;
    })();
    exports.Answer = Answer;

    Initialize();
});
//# sourceMappingURL=CockpitPortal.js.map
