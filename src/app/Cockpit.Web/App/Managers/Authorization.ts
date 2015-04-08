import jquery = require("jquery");
import knockout = require("knockout"); 
import Portal = require("Managers/Portal");
import Notification = require("Managers/Notification");
import Configuration = require("Managers/Configuration");
import Navigation = require("Managers/Navigation");

export var IsAuthorized: KnockoutObservable<boolean> = knockout.observable(false);
export var IsAuthorizing: KnockoutObservable<boolean> = knockout.observable(false);
export var HasCheckedAuthorization: KnockoutObservable<boolean> = knockout.observable(false);
export var CanLogin: KnockoutComputed<boolean> = knockout.computed(() => HasCheckedAuthorization() && !IsAuthorized());

var KeyPrefix = Portal.Client.GetServicePath() + "_";

var CanUseStorage: boolean = false;
try { CanUseStorage = window.localStorage != undefined; } catch (e){ }

function Intialize():void
{
	Portal.Client.SessionAuthenticated().Add(() => Authenticated(true));

	if (CanUseStorage) ListenForStorageCommunication();

	ReuseSession();
}

function ListenForStorageCommunication():void
{
	jquery(window).on("storage", e =>
	{
		var event = <StorageEvent>e.originalEvent;

		if (event.key == KeyPrefix + "IsAuthenticated")
		{
			if (event.newValue == "true" && IsAuthorized())
				Authenticated(false);
			else if (event.newValue == "false" && !IsAuthorized())
				Unauthenticated(false);
		}
	});
}

export function WhenAuthenticated(callback: () => void): void
{
	if (IsAuthorized())
		callback();
	else
	{
		var sub = IsAuthorized.subscribe(() =>
		{
			sub.dispose();
			callback();
		});
	}
}

export function Login(email:string, password:string, rememberLogin:boolean, errorCallback:()=>void):void
{
	if (IsAuthorized() || IsAuthorizing()) return;

	InnerLogin(email, password, rememberLogin, errorCallback);
}

export function LogOut():void
{
	Unauthenticated(true);
}

function InnerLogin(email:string, password:string, rememberLogin:boolean, errorCallback:() => void, isRetry:boolean = false):void
{
	IsAuthorizing(true);

	CHAOS.Portal.Client.EmailPassword.Login(email, password, Portal.ServiceCaller).WithCallback(response =>
	{
		if (response.Error != null)
		{
			if (response.Error.Fullname == "Chaos.Portal.Authentication.Exception.LoginException")
				errorCallback();
			else if (response.Error.Fullname == "Chaos.Portal.Core.Exceptions.SessionDoesNotExistException" && !isRetry)
			{
				CreateNewSession(() => InnerLogin(email, password, rememberLogin, errorCallback, true));
				return;
			}
			else
				Notification.NotifyError("Portal error logging in: " + response.Error.Message);

			IsAuthorizing(false);
		}
		else if (rememberLogin)
			CreateSecureCookie();
	});
}

function ReuseSession()
{
	if (CanUseStorage && GetStorage("PortalSession"))
	{
		Portal.ServiceCaller.UpdateSession({ Guid: GetStorage("PortalSession"), UserGuid: null, DateCreated: null, DateModified: null });
		CHAOS.Portal.Client.User.Get().WithCallback(response =>
		{
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
	} else
		CreateNewSession(SecureCookieLogin);
}

function CreateNewSession(nextStep:()=>void):void
{
	CHAOS.Portal.Client.Session.Create(Portal.ServiceCaller).WithCallback(response =>
	{
		if (response.Error != null)
			Notification.NotifyError("Portal error creating session: " + response.Error.Message);
		else
		{
			if (CanUseStorage) SetStorage("PortalSession", Portal.Client.GetCurrentSession().Guid);
			nextStep();
		}
	});
}

function SecureCookieLogin():void
{
	if (CanUseStorage && GetStorage("SecureCookieGuid") && GetStorage("SecureCookiePasswordGuid"))
	{
		CHAOS.Portal.Client.SecureCookie.Login(GetStorage("SecureCookieGuid"), GetStorage("SecureCookiePasswordGuid"), Portal.ServiceCaller).WithCallback(response =>
		{
			if (response.Error != null)
				Notification.NotifyWarning("Portal error creating secure cookie: " + response.Error.Message);
			else
				SetStorage("SecureCookiePasswordGuid", response.Body.Results[0].PasswordGuid);

			HasCheckedAuthorization(true);
		});
	} else
		HasCheckedAuthorization(true);
}

function CreateSecureCookie():void
{
	if (!CanUseStorage) return;

	CHAOS.Portal.Client.SecureCookie.Create(Portal.ServiceCaller).WithCallback(response =>
	{
		if (response.Error != null)
			Notification.NotifyWarning("Portal error creating secure cookie: " + response.Error.Message);
		else
		{
			SetStorage("SecureCookieGuid", response.Body.Results[0].Guid);
			SetStorage("SecureCookiePasswordGuid", response.Body.Results[0].PasswordGuid);
		}
	});
}

function Authenticated(broadcast:boolean):void
{
	IsAuthorizing(false);
	HasCheckedAuthorization(true);
	IsAuthorized(true);

	if (CanUseStorage && broadcast)
	{
		SetStorage("IsAuthenticated", "true");
		RemoveStorage("IsAuthenticated");
	}
}

function Unauthenticated(clearStorage: boolean): void
{
	if (CanUseStorage && clearStorage)
	{
		SetStorage("IsAuthenticated", "false");
		RemoveStorage("IsAuthenticated");
		RemoveStorage("SecureCookieGuid");
		RemoveStorage("SecureCookiePasswordGuid");
		RemoveStorage("PortalSession");
	}
	
	window.location.reload();
}

function GetStorage(key:string):string
{
	return localStorage.getItem(KeyPrefix + key);
}

function SetStorage(key: string, value: string): void
{
	return localStorage.setItem(KeyPrefix + key, value);
}

function RemoveStorage(key: string): void
{
	return localStorage.removeItem(KeyPrefix + key);
}

Intialize();