import knockout = require("knockout");
import Notification = require("Managers/Notification");

class Notifications
{
	public Notifications: KnockoutObservableArray<{ Message: string; Level: string }>;

	constructor()
	{
		this.Notifications = Notification.Notifications;
	}
}

export = Notifications;