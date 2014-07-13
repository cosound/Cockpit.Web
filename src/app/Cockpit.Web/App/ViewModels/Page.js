define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var Page = (function () {
        function Page(name) {
            this.Name = knockout.observable();
            this.Name(name);
        }
        return Page;
    })();

    
    return Page;
});
