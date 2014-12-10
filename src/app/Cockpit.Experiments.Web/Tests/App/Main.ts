requirejs.config({
	baseUrl: "../App",
	paths: {
		text: '../Lib/text/text',
		jquery: '../Lib/jQuery/jquery.min',
		routie: '../Lib/Routie/routie.min',
		knockout: '../Lib/knockout/knockout',
		bootstrap: '../Lib/bootstrap/js/bootstrap.min',
		Portal: '../Lib/PortalClient/PortalClient.min',
		Squire: '../Tests/Lib/Squire/Squire',
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
				'jquery'
			]
		},
		Portal: {
			exports: 'CHAOS.Portal.Client'
		}
	},
	waitSeconds: 20
});

declare module "Portal" { }
declare module "ExperimentData" { }

require(['Squire'], (Squire:any) =>
{
	var injector = new Squire();
	injector.mock('knockout', {
		observable: () =>
		{
			var value:any;

			return (val?:any) =>
			{
				if (val)
					value = val;
				else
					return value;
			}
		}
	})
	.require(['Managers/NavigationPage'], (NavigationPage:any) =>
	{
		var navigationPage = new NavigationPage("TestName", 20);

		console.log(navigationPage.Name());
	});
});