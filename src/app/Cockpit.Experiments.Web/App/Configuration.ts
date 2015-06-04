import knockout = require("knockout");

export var PortalPath: string = "https://dev-api.cosound.dk";
export var ExperimentTitle: string = "Cockpit Test";
export var CloseSlides:boolean = false;
export var SlideName: string = "slide";
export var FooterLabel:KnockoutObservable<string> = knockout.observable(null);