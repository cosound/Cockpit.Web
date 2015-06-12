define(["require", "exports"], function (require, exports) {
    var Configuration = (function () {
        function Configuration() {
            this.PortalPath = "https://prod-api.cosound.dk";
        }
        return Configuration;
    })();
    var instance = new Configuration();
    return instance;
});
