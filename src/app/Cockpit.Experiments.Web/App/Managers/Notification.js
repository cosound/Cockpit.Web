define(["require", "exports"], function (require, exports) {
    var Notification = (function () {
        function Notification() {
        }
        Notification.prototype.Error = function (message) {
            console.log("Error: " + message);
        };
        Notification.prototype.Debug = function (message) {
            console.log("Debug: " + message);
        };
        return Notification;
    })();
    var instance = new Notification();
    return instance;
});
