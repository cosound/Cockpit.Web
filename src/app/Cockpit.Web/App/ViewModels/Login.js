define(["require", "exports", "knockout", "Navigation", "less!Styles/Login"], function(require, exports, knockout, Navigation) {
    var Login = (function () {
        function Login() {
            this.Email = knockout.observable();
            this.Password = knockout.observable();
        }
        Login.prototype.Login = function () {
            Navigation.Navigate("Experiments");
        };
        return Login;
    })();

    
    return Login;
});
