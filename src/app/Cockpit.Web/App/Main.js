requirejs.config({
    paths: {
        'text': '../Lib/text/text',
        'jquery': '../Lib/jQuery/jquery.min',
        'routie': '../Lib/Routie/routie.min',
        'knockout': '../Lib/knockout/knockout',
        'knockout-amd-helpers': '../Lib/knockout-amd-helpers/knockout-amd-helpers.min',
        'bootstrap': '../Lib/bootstrap/js/bootstrap.min',
        'Portal': '../Lib/PortalClient/PortalClient.min'
    },
    map: {
        '*': {
            'css': '../Lib/require-css/css',
            'less': '../Lib/require-less/less'
        }
    },
    shim: {
        bootstrap: {
            deps: [
                'jquery',
                'css!../Lib/bootstrap/css/bootstrap.min',
                'css!../Lib/bootstrap/css/bootstrap-theme.min'
            ]
        },
        Portal: {
            exports: 'CHAOS.Portal.Client'
        },
        routie: {
            exports: 'routie'
        }
    },
    waitSeconds: 20,
    urlArgs: "bust=" + CacheBuster
});

require(['ViewModels/Shell', 'knockout', 'bootstrap', 'knockout-amd-helpers', 'Portal'], function (shell, knockout) {
    knockout.amdTemplateEngine.defaultPath = "Views";
    knockout.amdTemplateEngine.defaultSuffix = ".html";
    knockout.amdTemplateEngine.defaultRequireTextPluginName = "text";
    knockout.bindingHandlers.module.baseDir = "ViewModels";

    knockout.applyBindings(new shell());
});
