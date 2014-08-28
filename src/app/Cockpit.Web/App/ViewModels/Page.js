define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var Page = (function () {
        function Page(name, parameters) {
            if (typeof parameters === "undefined") { parameters = null; }
            this.Name = knockout.observable();
            this.Parameters = knockout.observable();
            this.Name(name);
            this.Parameters(parameters);
        }
        return Page;
    })();

    
    return Page;
});
