define(["require", "exports", "knockout", "ViewModels/Experiments/Experiment", "ViewModels/Experiments/Participant"], function(require, exports, knockout, Experiment, Participant) {
    exports.Experiments = knockout.observableArray();

    InitializeFakeExperiments();

    function CreateExperiment(name, emails, configuration, callback) {
        FakeCreateExperiment(name, emails, configuration, callback);
    }
    exports.CreateExperiment = CreateExperiment;

    function InitializeFakeExperiments() {
        FakeCreateExperiment("My Experiment", ["Peter@Test.com", "Jesper@test.com"], "<Configuration></Configuration>", null);
        FakeCreateExperiment("My Other Experiment", ["Peter@Test.com", "Jesper@test.com"], "<Configuration></Configuration>", null);
        FakeCreateExperiment("My Super Experiment", ["Peter@Test.com", "Jesper@test.com"], "<Configuration></Configuration>", null);
        FakeCreateExperiment("My Fantastic Experiment 1", ["Peter@Test.com", "Jesper@test.com"], "<Configuration></Configuration>", null);
        FakeCreateExperiment("My Meh Experiment", ["Peter@Test.com", "Jesper@test.com"], "<Configuration></Configuration>", null);
    }

    function FakeCreateExperiment(name, emails, configuration, callback) {
        window.setTimeout(function () {
            var experiement = new Experiment();
            var participants = emails.map(function (v) {
                return new Participant(v, "Some response: " + (Math.random() * 10000).toString());
            });

            experiement.Id(Math.floor(Math.random() * 10000).toString());
            experiement.Name(name);
            experiement.Configuration(configuration);
            experiement.Participants.push.apply(experiement.Participants, participants);

            exports.Experiments.push(experiement);

            if (callback != null)
                callback(true, experiement);
        }, 100);
    }
});
