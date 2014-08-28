define(["require", "exports", "knockout", "ViewModels/Experiments/Experiment", "ViewModels/Experiments/Participant"], function(require, exports, knockout, Experiment, Participant) {
    exports.Experiments = knockout.observableArray();

    function CreateExperiment(name, emails, configuration, callback) {
        FakeCreateExperiment(name, emails, configuration, callback);
    }
    exports.CreateExperiment = CreateExperiment;

    function FakeCreateExperiment(name, emails, configuration, callback) {
        window.setTimeout(function () {
            var experiement = new Experiment();
            var participants = emails.map(function (v) {
                return new Participant(v, "Some response: " + (Math.random() * 10000).toString());
            });

            experiement.Id(Math.floor(Math.random() * 10000).toString());
            experiement.Name(name);
            experiement.Configuration(configuration);
            experiement.Participants.push.call(experiement.Participants, participants);

            exports.Experiments.push(experiement);
            callback(true, experiement);
        }, 100);
    }
});
