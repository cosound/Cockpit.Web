define(["require", "exports", "knockout", "AuthenticationManager", "less!Styles/Login"], function(require, exports, knockout, AuthenticationManager) {
    var Login = (function () {
        function Login() {
            this.Email = knockout.observable();
            this.Password = knockout.observable();
        }
        Login.prototype.Login = function () {
            AuthenticationManager.Authenticate();
        };
        return Login;
    })();

    
    return Login;
});
