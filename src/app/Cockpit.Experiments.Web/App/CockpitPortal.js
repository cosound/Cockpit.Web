define(["require", "exports", "Configuration"], function (require, exports, Configuration) {
    exports.Client;
    function Initialize() {
        exports.Client = CHAOS.Portal.Client.Initialize(Configuration.PortalPath);
    }
    var Experiment = (function () {
        function Experiment() {
        }
        Experiment.Get = function (id, serviceCaller) {
            if (serviceCaller === void 0) { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
            return serviceCaller.CallService("Experiment/Get", CHAOS.Portal.Client.HttpMethod.Get, { id: id }, false, "json3");
        };
        Experiment.Next = function (listId, serviceCaller) {
            if (serviceCaller === void 0) { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
            return serviceCaller.CallService("Experiment/Next", CHAOS.Portal.Client.HttpMethod.Get, { listId: listId }, false, "json3");
        };
        return Experiment;
    })();
    exports.Experiment = Experiment;
    var Slide = (function () {
        function Slide() {
        }
        Slide.Close = function (questionaireId, slideIndex, serviceCaller) {
            if (serviceCaller === void 0) { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
            return serviceCaller.CallService("Slide/Close", CHAOS.Portal.Client.HttpMethod.Get, { questionaireId: questionaireId, slideIndex: slideIndex }, false, "json3");
        };
        return Slide;
    })();
    exports.Slide = Slide;
    var Question = (function () {
        function Question() {
        }
        Question.Get = function (id, index, serviceCaller) {
            if (serviceCaller === void 0) { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
            return serviceCaller.CallService("Question/Get", CHAOS.Portal.Client.HttpMethod.Get, { id: id, index: index }, false, "json3");
        };
        return Question;
    })();
    exports.Question = Question;
    var Answer = (function () {
        function Answer() {
        }
        Answer.Set = function (questionId, output, serviceCaller) {
            if (serviceCaller === void 0) { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
            return serviceCaller.CallService("Answer/Set", CHAOS.Portal.Client.HttpMethod.Post, { questionId: questionId, output: JSON.stringify(output) }, false);
        };
        return Answer;
    })();
    exports.Answer = Answer;
    Initialize();
});
