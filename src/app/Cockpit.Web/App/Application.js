define(["require", "exports", "ViewModels/Shell", "Navigation", "less!Styles/Default"], function(require, exports, Shell, Navigation) {
    var Application = (function () {
        function Application() {
            Navigation.Initialize();
            this.Shell = new Shell();
        }
        return Application;
    })();

    
    return Application;
});
