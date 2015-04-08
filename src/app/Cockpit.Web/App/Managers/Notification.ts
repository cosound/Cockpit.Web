import knockout = require("knockout");

export var Notifications: KnockoutObservableArray<{ Message: string; Level: string }> = knockout.observableArray<{ Message: string; Level: string  }>();

export function NotifyError(message: string): void
{
	console.log(message);

	Notifications.push({ Message: message, Level: "Error" });
}

export function NotifyWarning(message: string): void
{
	console.log(message);

	Notifications.push({ Message: message, Level: "Warning" });
}