import knockout = require("knockout");
import Configuration = require("Configuration");
import Navigation = require("Managers/Navigation");
import NavigationPage = require("Managers/NavigationPage");
import TextFormatter = require("Managers/TextFormatter");

class Shell
{
	public Page: KnockoutObservable<NavigationPage>;
	public FooterLabel: KnockoutComputed<string>;
	public IsFooterVisible:KnockoutComputed<boolean>;

	constructor()
	{
		this.Page = Navigation.CurrentPage;
		this.FooterLabel = knockout.computed(() => TextFormatter.Format(Configuration.FooterLabel()));
		this.IsFooterVisible = knockout.computed(() => this.FooterLabel() != null && this.FooterLabel() !== "");

		Navigation.Initialize();
	}
}

export = Shell;