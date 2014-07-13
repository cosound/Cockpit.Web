/// <amd-dependency path="less!Styles/Login" />
import knockout = require("knockout");
import Navigation = require("Navigation");

class Login
{
	public Email:KnockoutObservable<string> = knockout.observable<string>();
	public Password: KnockoutObservable<string> = knockout.observable<string>();

	public Login():void
	{
		Navigation.Navigate("Experiments");
	}
}

export = Login;