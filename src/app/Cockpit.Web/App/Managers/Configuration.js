define(["require", "exports", "text!../../Configuration.json"], function (require, exports, configuration) {
    var data = JSON.parse(configuration);
    exports.PortalServicePath = data.PortalServicePath;
});
