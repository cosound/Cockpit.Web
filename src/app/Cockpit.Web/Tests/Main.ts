/// <reference path="../TypeScriptDefinitions/require.d.ts" />

requirejs.config({
	baseUrl: "../App",
	paths: {
		text: '../Lib/text/text',
		jquery: '../Lib/jQuery/jquery.min',
		routie: '../Lib/Routie/routie.min',
		knockout: '../Lib/knockout/knockout',
		'knockout-amd-helpers': '../Lib/knockout-amd-helpers/knockout-amd-helpers.min',
		bootstrap: '../Lib/bootstrap/js/bootstrap.min',
		jsPlumb: '../Lib/jsPlumb/js/dom.jsPlumb-1.6.2-min',
		Portal: '../Lib/PortalClient/PortalClient.min',
		QUnit: '../Lib/QUnit/qunit',
		Tests: '../Tests'
	},
	map: {
		'*': {
			css: '../Lib/require-css/css.min'
		}
	},
	packages: [
		{
			name: 'less',
			location: '../Lib/require-less',
			main: 'less'
		}
	],
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
		QUnit: {
			exports: 'QUnit',
			init: () =>
			{
				QUnit.config.autoload = false;
				QUnit.config.autostart = false;
			}
		}
	},
	waitSeconds: 20
});

declare module "Navigation" { };

require(['QUnit', 'Tests/NavigationTest'], (qUnit:QUnitStatic, navigationTest: any) =>
{
	navigationTest.run();
	
	QUnit.load();
	QUnit.start();
});