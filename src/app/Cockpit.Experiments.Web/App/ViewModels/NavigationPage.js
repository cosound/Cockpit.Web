define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var NavigationPage = (function () {
        function NavigationPage(name, data) {
            this.Name = knockout.observable();
            this.Data = knockout.observable();
            this.Name(name);
            this.Data(data);
        }
        return NavigationPage;
    })();

    
    return NavigationPage;
});
//# sourceMappingURL=NavigationPage.js.map
