define(["require", "exports", "knockout"], function(require, exports, knockout) {
    exports.Experiment = knockout.observable();
    exports.ExperimentLoaded = knockout.computed(function () {
        return exports.Experiment() != null;
    });
    exports.ExperimentIsLoading = knockout.observable(false);

    function LoadExperiment(id) {
        exports.ExperimentIsLoading(true);
        exports.Experiment(GetData());
        exports.ExperimentIsLoading(false);
    }
    exports.LoadExperiment = LoadExperiment;

    function GetData() {
        return {
            Name: "My Experiment",
            CompletedSlide: {
                Type: "ThankYou",
                Text: "We appreciate your time"
            },
            Slides: [
                {
                    Type: "Intro",
                    Text: "Hey and welcome to my experiment"
                },
                {
                    Type: "Form",
                    Inputs: [
                        {
                            Type: "Text",
                            Label: "Name"
                        },
                        {
                            Type: "Radio",
                            Label: "Gender",
                            Options: [
                                "Male",
                                "Female"
                            ]
                        }
                    ]
                },
                {
                    Type: "AudioRating",
                    StreamUrl: "http://Cocking.dk/Mystream.mp4",
                    RatingLabel: "Mood"
                }
            ]
        };
    }
});
//# sourceMappingURL=ExperimentManager.js.map
