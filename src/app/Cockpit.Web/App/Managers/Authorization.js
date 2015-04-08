define(["require", "exports", "jquery", "knockout", "Managers/Portal", "Managers/Notification"], function (require, exports, jquery, knockout, Portal, Notification) {
    exports.IsAuthorized = knockout.observable(false);
    exports.IsAuthorizing = knockout.observable(false);
    exports.HasCheckedAuthorization = knockout.observable(false);
    exports.CanLogin = knockout.computed(function () { return exports.HasCheckedAuthorization() && !exports.IsAuthorized(); });
    var KeyPrefix = Portal.Client.GetServicePath() + "_";
    var CanUseStorage = false;
    try {
        CanUseStorage = window.localStorage != undefined;
    }
    catch (e) {
    }
    function Intialize() {
        Portal.Client.SessionAuthenticated().Add(function () { return Authenticated(true); });
        if (CanUseStorage)
            ListenForStorageCommunication();
        ReuseSession();
    }
    function ListenForStorageCommunication() {
        jquery(window).on("storage", function (e) {
            var event = e.originalEvent;
            if (event.key == KeyPrefix + "IsAuthenticated") {
                if (event.newValue == "true" && exports.IsAuthorized())
                    Authenticated(false);
                else if (event.newValue == "false" && !exports.IsAuthorized())
                    Unauthenticated(false);
            }
        });
    }
    function WhenAuthenticated(callback) {
        if (exports.IsAuthorized())
            callback();
        else {
            var sub = exports.IsAuthorized.subscribe(function () {
                sub.dispose();
                callback();
            });
        }
    }
    exports.WhenAuthenticated = WhenAuthenticated;
    function Login(email, password, rememberLogin, errorCallback) {
        if (exports.IsAuthorized() || exports.IsAuthorizing())
            return;
        InnerLogin(email, password, rememberLogin, errorCallback);
    }
    exports.Login = Login;
    function LogOut() {
        Unauthenticated(true);
    }
    exports.LogOut = LogOut;
    function InnerLogin(email, password, rememberLogin, errorCallback, isRetry) {
        if (isRetry === void 0) { isRetry = false; }
        exports.IsAuthorizing(true);
        CHAOS.Portal.Client.EmailPassword.Login(email, password, Portal.ServiceCaller).WithCallback(function (response) {
            if (response.Error != null) {
                if (response.Error.Fullname == "Chaos.Portal.Authentication.Exception.LoginException")
                    errorCallback();
                else if (response.Error.Fullname == "Chaos.Portal.Core.Exceptions.SessionDoesNotExistException" && !isRetry) {
                    CreateNewSession(function () { return InnerLogin(email, password, rememberLogin, errorCallback, true); });
                    return;
                }
                else
                    Notification.NotifyError("Portal error logging in: " + response.Error.Message);
                exports.IsAuthorizing(false);
            }
            else if (rememberLogin)
                CreateSecureCookie();
        });
    }
    function ReuseSession() {
        if (CanUseStorage && GetStorage("PortalSession")) {
            Portal.ServiceCaller.UpdateSession({ Guid: GetStorage("PortalSession"), UserGuid: null, DateCreated: null, DateModified: null });
            CHAOS.Portal.Client.User.Get().WithCallback(function (response) {
                if (response.Error != null) {
                    if (response.Error.Fullname != "Chaos.Portal.Core.Exceptions.SessionDoesNotExistException" && response.Error.Fullname != "Chaos.Portal.Core.Exceptions.InsufficientPermissionsException")
                        Notification.NotifyWarning("Portal error reusing session: " + response.Error.Message);
                    CreateNewSession(SecureCookieLogin);
                }
                else if (response.Body.Results.length == 0 || response.Body.Results[0].Email == "anon@ymo.us")
                    CreateNewSession(SecureCookieLogin);
                else
                    Portal.ServiceCaller.SetSessionAuthenticated("ReusedSession");
            });
        }
        else
            CreateNewSession(SecureCookieLogin);
    }
    function CreateNewSession(nextStep) {
        CHAOS.Portal.Client.Session.Create(Portal.ServiceCaller).WithCallback(function (response) {
            if (response.Error != null)
                Notification.NotifyError("Portal error creating session: " + response.Error.Message);
            else {
                if (CanUseStorage)
                    SetStorage("PortalSession", Portal.Client.GetCurrentSession().Guid);
                nextStep();
            }
        });
    }
    function SecureCookieLogin() {
        if (CanUseStorage && GetStorage("SecureCookieGuid") && GetStorage("SecureCookiePasswordGuid")) {
            CHAOS.Portal.Client.SecureCookie.Login(GetStorage("SecureCookieGuid"), GetStorage("SecureCookiePasswordGuid"), Portal.ServiceCaller).WithCallback(function (response) {
                if (response.Error != null)
                    Notification.NotifyWarning("Portal error creating secure cookie: " + response.Error.Message);
                else
                    SetStorage("SecureCookiePasswordGuid", response.Body.Results[0].PasswordGuid);
                exports.HasCheckedAuthorization(true);
            });
        }
        else
            exports.HasCheckedAuthorization(true);
    }
    function CreateSecureCookie() {
        if (!CanUseStorage)
            return;
        CHAOS.Portal.Client.SecureCookie.Create(Portal.ServiceCaller).WithCallback(function (response) {
            if (response.Error != null)
                Notification.NotifyWarning("Portal error creating secure cookie: " + response.Error.Message);
            else {
                SetStorage("SecureCookieGuid", response.Body.Results[0].Guid);
                SetStorage("SecureCookiePasswordGuid", response.Body.Results[0].PasswordGuid);
            }
        });
    }
    function Authenticated(broadcast) {
        exports.IsAuthorizing(false);
        exports.HasCheckedAuthorization(true);
        exports.IsAuthorized(true);
        if (CanUseStorage && broadcast) {
            SetStorage("IsAuthenticated", "true");
            RemoveStorage("IsAuthenticated");
        }
    }
    function Unauthenticated(clearStorage) {
        if (CanUseStorage && clearStorage) {
            SetStorage("IsAuthenticated", "false");
            RemoveStorage("IsAuthenticated");
            RemoveStorage("SecureCookieGuid");
            RemoveStorage("SecureCookiePasswordGuid");
            RemoveStorage("PortalSession");
        }
        window.location.reload();
    }
    function GetStorage(key) {
        return localStorage.getItem(KeyPrefix + key);
    }
    function SetStorage(key, value) {
        return localStorage.setItem(KeyPrefix + key, value);
    }
    function RemoveStorage(key) {
        return localStorage.removeItem(KeyPrefix + key);
    }
    Intialize();
});
