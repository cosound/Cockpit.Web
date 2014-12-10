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
require(['Squire'], function (Squire) {
    var injector = new Squire();
    injector.mock('knockout', {
        observable: function () {
            var value;
            return function (val) {
                if (val)
                    value = val;
                else
                    return value;
            };
        }
    }).require(['Managers/NavigationPage'], function (NavigationPage) {
        var navigationPage = new NavigationPage("TestName", 20);
        console.log(navigationPage.Name());
    });
});
//# sourceMappingURL=Main.js.map