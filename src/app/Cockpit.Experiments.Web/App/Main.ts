requirejs.config({
	paths: {
		text: "../Lib/text/text",
		jquery: "../Lib/jQuery/jquery.min",
		routie: "../Lib/Routie/routie.min",
		knockout: "../Lib/knockout/knockout",
		bootstrap: "../Lib/bootstrap/js/bootstrap.min",
		Portal: "../Lib/PortalClient/PortalClient.min",
		Highcharts: "../Lib/Highcharts/highcharts",
		HighchartsMore: "../Lib/Highcharts/highcharts-more",
		HighChartsDraggablePoints: "../Lib/Highcharts/draggable-points/draggable-points",
		HighChartsCrossingSpecificValue: "../Lib/Highcharts/crossing-specific-value/crossing-specific-value",
		"crypto-js": "../Lib/crypto-js/md5",
	},
	map: {
		"*": {
			css: "../Lib/require-css/css.min"
		}
	},
	shim: {
		routie: {
			exports: "routie"
		},
		bootstrap: {
			deps: [
				"jquery",
				"css!../Lib/bootstrap/css/bootstrap.min",
				"css!../Lib/bootstrap/css/bootstrap-theme.min"
			]
		},
		Highcharts: {
			exports: "Highcharts",
			deps: ["jquery"]
		},
		HighchartsMore: {
			deps: ["jquery", "Highcharts"]
		},
		HighChartsDraggablePoints: {
			deps: ["jquery", "Highcharts", "HighchartsMore"]
		},
		HighChartsCrossingSpecificValue: {
			deps: ["jquery", "Highcharts", "HighchartsMore"]
		},
		Portal: {
			exports: "CHAOS.Portal.Client"
		},
		"crypto-js": {
			exports: "CryptoJS"
		}
	},
	waitSeconds: 20,
	urlArgs: "bust=" + CacheBuster
});

declare module "Portal" { }

declare var CacheBuster: number;

require(["Components/NameConventionLoader", "knockout", "bootstrap", "Portal", "css!Styles/Default", "KnockoutBindings/KnockoutBindings"], (nameConventionLoader:any, knockout: any) =>
{
	knockout.components.loaders.push(new nameConventionLoader("Cockpit"));

	knockout.applyBindings();
});