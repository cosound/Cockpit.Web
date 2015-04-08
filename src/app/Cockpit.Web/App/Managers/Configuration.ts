import configuration = require("text!../../Configuration.json");

var data = JSON.parse(configuration);

export var PortalServicePath:string = data.PortalServicePath;