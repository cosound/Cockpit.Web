define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var Page = (function () {
        function Page(name, data) {
            this.Name = knockout.observable();
            this.Data = knockout.observable();
            this.Name(name);
            this.Data(data);
        }
        return Page;
    })();

    
    return Page;
});
//# sourceMappingURL=Page.js.map
