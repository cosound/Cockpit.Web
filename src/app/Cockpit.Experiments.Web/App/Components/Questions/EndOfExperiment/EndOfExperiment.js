var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Managers/Experiment", "Components/Questions/QuestionBase"], function (require, exports, ExperimentManager, QuestionBase) {
    var EndOfExperiment = (function (_super) {
        __extends(EndOfExperiment, _super);
        function EndOfExperiment(question) {
            _super.call(this, question, false);
            ExperimentManager.ExperimentCompleted();
        }
        return EndOfExperiment;
    })(QuestionBase);
    return EndOfExperiment;
});
