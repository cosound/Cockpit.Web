import knockout = require("knockout");
import Navigation = require("Managers/Navigation");
import Authorization = require("Managers/Authorization");

class Shell
{
	public HasCheckedAuthorization: KnockoutObservable<boolean>;
	public Page: KnockoutComputed<{ Name: string; Data: any }>;

	constructor()
	{
		Navigation.Initialize();

		this.HasCheckedAuthorization = Authorization.HasCheckedAuthorization;

		this.Page = knockout.computed(() =>
		{
			if (Navigation.CurrentPage() == null || !Authorization.HasCheckedAuthorization()) return null;
			if (!Authorization.IsAuthorized()) return { Name: "Login", Data: null };
			return Navigation.CurrentPage();
		});
		this.Page.extend({ rateLimit: 0 });
	}
}

export = Shell;