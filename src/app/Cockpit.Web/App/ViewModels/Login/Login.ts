/// <amd-dependency path="less!Styles/Login" />
import knockout = require("knockout");
import AuthorizationManager = require("AuthorizationManager");

class Login
{
	public Email:KnockoutObservable<string> = knockout.observable<string>();
	public Password: KnockoutObservable<string> = knockout.observable<string>();

	public Login():void
	{
		AuthorizationManager.Authenticate();
	}
}

export = Login;