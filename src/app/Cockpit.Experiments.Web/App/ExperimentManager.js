define(["require", "exports", "knockout"], function(require, exports, knockout) {
    exports.Experiment = knockout.observable();
    exports.ExperimentLoaded = knockout.computed(function () {
        return exports.Experiment() != null;
    });

    function LoadExperiment(id) {
        exports.Experiment(GetData());
    }
    exports.LoadExperiment = LoadExperiment;

    function GetData() {
        return {
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
                }
            ]
        };
    }
});
//# sourceMappingURL=ExperimentManager.js.map
