import knockout = require("knockout");

class NameConventionLoader implements KnockoutComponentLoader
{
	private _prefix: string;

	constructor(prefix:string)
	{
		this._prefix = prefix;
	}

	public getConfig(componentName:string, callback:(result:KnockoutComponentConfig) => void):void
	{
		if (componentName.indexOf(this._prefix + "-") != 0)
			componentName = this._prefix + "-" + componentName;

		knockout.components.register(componentName, {});

		var filePath = componentName.replace(this._prefix + "-", "").replace("-", "/");
		filePath += (filePath.lastIndexOf("/") == -1 ? "/" + filePath : filePath.substring(filePath.lastIndexOf("/")));

		callback({
			viewModel: { require: filePath },
			template: { require: "text!" + filePath + ".html" }
		});
	}
}

export = NameConventionLoader;