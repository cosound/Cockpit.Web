requirejs.config({
    paths: {
        text: '../Lib/text/text',
        jquery: '../Lib/jQuery/jquery.min',
        routie: '../Lib/Routie/routie.min',
        knockout: '../Lib/knockout/knockout',
        'knockout-amd-helpers': '../Lib/knockout-amd-helpers/knockout-amd-helpers.min',
        bootstrap: '../Lib/bootstrap/js/bootstrap.min',
        jsPlumb: '../Lib/jsPlumb/js/dom.jsPlumb-1.6.2-min',
        Portal: '../Lib/PortalClient/PortalClient.min'
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
        jsPlumb: {
            exports: 'jsPlumb',
            deps: [
                'jquery',
                'css!../Lib/jsPlumb/css/jsplumb'
            ]
        },
        Portal: {
            exports: 'CHAOS.Portal.Client'
        }
    },
    waitSeconds: 20,
    urlArgs: "bust=" + CacheBuster
});

require(['Application', 'knockout', 'bootstrap', 'knockout-amd-helpers', 'Portal'], function (application, knockout) {
    knockout.amdTemplateEngine.defaultPath = "Views";
    knockout.amdTemplateEngine.defaultSuffix = ".html";
    knockout.amdTemplateEngine.defaultRequireTextPluginName = "text";
    knockout.bindingHandlers.module.baseDir = "ViewModels";

    knockout.applyBindings(new application());
});
