import knockout = require("knockout");
import Navigation = require("Managers/Navigation");
import NavigationPage = require("Managers/NavigationPage");
import TextFormatter = require("Managers/TextFormatter");
import ExperimentManager = require("Managers/Experiment");

class Shell
{
	public Page: KnockoutObservable<NavigationPage>;
	public FooterLabel: KnockoutComputed<string>;
	public IsFooterVisible:KnockoutComputed<boolean>;

	constructor()
	{
		this.Page = Navigation.CurrentPage;
		this.FooterLabel = knockout.computed(() => TextFormatter.Format(ExperimentManager.FooterLabel()));
		this.IsFooterVisible = knockout.computed(() => this.FooterLabel() != null && this.FooterLabel() !== "");

		Navigation.Initialize();
	}
}

export = Shell;