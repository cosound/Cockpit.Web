define(["require", "exports", "Managers/Notification"], function (require, exports, Notification) {
    var Notifications = (function () {
        function Notifications() {
            this.Notifications = Notification.Notifications;
        }
        return Notifications;
    })();
    return Notifications;
});
