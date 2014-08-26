﻿import knockout = require("knockout");

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

		var fileName = componentName.replace(this._prefix + "-", "").replace("-", "/");

		callback({
			viewModel: { require: "ViewModels/" + fileName },
			template: { require: "text!Views/" + fileName + ".html" }
		});
	}
}

export = NameConventionLoader;