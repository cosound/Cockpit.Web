import knockout = require("knockout");
import Authorization = require("Managers/Authorization");
import Title = require("Managers/Title");

class Login
{
	public Email:KnockoutObservable<string> = knockout.observable("");
	public Password: KnockoutObservable<string> = knockout.observable("");
	public RememberLogin: KnockoutObservable<boolean> = knockout.observable(false);
	public HasLoginFailed: KnockoutObservable<boolean> = knockout.observable(false);

	public IsAuthorizing: KnockoutObservable<boolean>;
	public CanLogin:KnockoutComputed<boolean>;

	constructor()
	{
		this.IsAuthorizing = Authorization.IsAuthorizing;
		this.CanLogin = knockout.computed(() => this.Email() && this.Password() && !this.IsAuthorizing());
		Title.ToDefault("Login");
	}

	public Login():void
	{
		if (!this.CanLogin()) return;

		this.HasLoginFailed(false);

		Authorization.Login(this.Email(), this.Password(), this.RememberLogin(), () => this.HasLoginFailed(true));
	}
}

export = Login;