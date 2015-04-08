define(["require", "exports", "knockout"], function (require, exports, knockout) {
    exports.Notifications = knockout.observableArray();
    function NotifyError(message) {
        console.log(message);
        exports.Notifications.push({ Message: message, Level: "Error" });
    }
    exports.NotifyError = NotifyError;
    function NotifyWarning(message) {
        console.log(message);
        exports.Notifications.push({ Message: message, Level: "Warning" });
    }
    exports.NotifyWarning = NotifyWarning;
});
