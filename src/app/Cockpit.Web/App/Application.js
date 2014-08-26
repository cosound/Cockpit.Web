define(["require", "exports", "Navigation", "less!Styles/Default"], function(require, exports, Navigation) {
    var Application = (function () {
        function Application() {
            Navigation.Initialize();
        }
        return Application;
    })();

    
    return Application;
});
