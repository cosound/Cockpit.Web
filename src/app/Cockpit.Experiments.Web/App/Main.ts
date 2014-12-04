/// <reference path="../TypeScriptDefinitions/require.d.ts" />

requirejs.config({
	paths: {
		text: '../Lib/text/text',
		jquery: '../Lib/jQuery/jquery.min',
		routie: '../Lib/Routie/routie.min',
		knockout: '../Lib/knockout/knockout',
		bootstrap: '../Lib/bootstrap/js/bootstrap.min',
		Portal: '../Lib/PortalClient/PortalClient.min',
	},
	map: {
		'*': {
			css: '../Lib/require-css/css.min'
		}
	},
	shim: {
		routie: {
			exports: 'routie'
		},
		bootstrap: {
			deps: [
				'jquery',
				'css!../Lib/bootstrap/css/bootstrap.min',
				'css!../Lib/bootstrap/css/bootstrap-theme.min'
			]
		},
		Portal: {
			exports: 'CHAOS.Portal.Client'
		}
	},
	waitSeconds: 20,
	urlArgs: "bust=" + CacheBuster
});

declare module "Portal" { }
declare module "ExperimentData" { }

declare var CacheBuster: number;

require(['Components/NameConventionLoader', 'knockout', 'bootstrap', 'Portal', 'css!Styles/Default', 'KnockoutBindings/KnockoutBindings'], (nameConventionLoader:any, knockout: any) =>
{
	knockout.components.loaders.push(new nameConventionLoader("Cockpit"));

	knockout.applyBindings();
});