define(["require", "exports", "ViewModels/Shell"], function(require, exports, Shell) {
    var Application = (function () {
        function Application() {
            this.Shell = new Shell();
        }
        return Application;
    })();

    
    return Application;
});
