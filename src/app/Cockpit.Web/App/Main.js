requirejs.config({
    paths: {
        text: "../Lib/requirejs/text",
        jquery: "../Lib/jquery/jquery.min",
        routie: "../Lib/routie/routie.min",
        knockout: "../Lib/knockout/knockout.min",
        bootstrap: "../Lib/bootstrap/js/bootstrap.min",
        Portal: "../Lib/Portal/PortalClient",
    },
    shim: {
        routie: {
            exports: "routie"
        },
        bootstrap: {
            deps: ["jquery"]
        },
        Portal: {
            exports: "CHAOS.Portal.Client"
        }
    },
    waitSeconds: 20,
    urlArgs: "bust=" + CacheBuster
});
require(["NameConventionLoader", "knockout", "bootstrap", "Managers/Portal", "KnockoutBindings/Element", "KnockoutBindings/Tooltip"], function (nameConventionLoader, knockout) {
    knockout.components.loaders.push(new nameConventionLoader("Cockpit"));
    knockout.applyBindings();
});
