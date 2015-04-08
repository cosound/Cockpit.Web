import knockout = require("knockout");
import Navigation = require("Managers/Navigation");
import Authorization = require("Managers/Authorization");

class TopBar
{
	public IsAuthorized: KnockoutObservable<boolean>;
	public CurrentPageName:KnockoutComputed<string>;

	constructor()
	{
		this.IsAuthorized = Authorization.IsAuthorized;
		this.CurrentPageName = knockout.computed(() => Navigation.CurrentPage() == null ? "" : Navigation.CurrentPage().Name);
	}
}

export = TopBar;