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

    function SaveSlideData(id, data) {
        console.log("Saving data for slide " + id + ": " + data);
    }
    exports.SaveSlideData = SaveSlideData;

    function GetData() {
        return {
            Name: "Was the 80's the worst decade for music?",
            CompletedSlide: {
                Type: "ThankYou",
                Text: "We appreciate your time"
            },
            Slides: [
                {
                    Type: "Intro",
                    Text: "Hey and welcome to experiment about music."
                },
                {
                    Type: "Form",
                    Inputs: [
                        {
                            Type: "Text",
                            Label: "Name"
                        },
                        {
                            Type: "Text",
                            Label: "Age"
                        },
                        {
                            Type: "Radio",
                            Label: "Gender",
                            Options: [
                                "Male",
                                "Female"
                            ]
                        },
                        {
                            Type: "Radio",
                            Label: "Music Lover",
                            Options: [
                                "Yes",
                                "A bit",
                                "No"
                            ]
                        }
                    ]
                },
                {
                    Type: "AudioRating",
                    StreamUrl: "http://Cocpit.dk/Mystream1.mp4",
                    RatingLabel: "Mood",
                    RatingMinLabel: "Sad",
                    RatingMaxLabel: "Happy"
                },
                {
                    Type: "AudioRating",
                    StreamUrl: "http://Cocpit.dk/Mystream2.mp4",
                    RatingLabel: "Rythme",
                    RatingMinLabel: "Slow",
                    RatingMaxLabel: "Fast"
                },
                {
                    Type: "AudioRating",
                    StreamUrl: "http://Cocpit.dk/Mystream3.mp4",
                    RatingLabel: "Colour",
                    RatingMinLabel: "Blue",
                    RatingMaxLabel: "Orange"
                }
            ]
        };
    }
});
//# sourceMappingURL=ExperimentManager.js.map
