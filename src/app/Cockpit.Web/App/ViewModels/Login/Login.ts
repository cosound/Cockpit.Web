/// <amd-dependency path="less!Styles/Login" />
import knockout = require("knockout");
import AuthenticationManager = require("AuthenticationManager");

class Login
{
	public Email:KnockoutObservable<string> = knockout.observable<string>();
	public Password: KnockoutObservable<string> = knockout.observable<string>();

	public Login():void
	{
		AuthenticationManager.Authenticate();
	}
}

export = Login;