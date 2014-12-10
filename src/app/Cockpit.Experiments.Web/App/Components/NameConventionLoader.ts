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
		filePath = NameConventionLoader.GetFilePath(filePath);

		callback({
			viewModel: { require: filePath },
			template: { require: "text!" + filePath + ".html" }
		});
	}

	public static GetFilePath(name:string):string
	{
		var filePath = name + (name.lastIndexOf("/") == -1 ? "/" + name : name.substring(name.lastIndexOf("/")));

		return "Components/" + filePath;
	}
}

export = NameConventionLoader;