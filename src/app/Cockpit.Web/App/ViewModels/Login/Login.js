define(["require", "exports", "knockout", "AuthorizationManager", "less!Styles/Login"], function(require, exports, knockout, AuthorizationManager) {
    var Login = (function () {
        function Login() {
            this.Email = knockout.observable();
            this.Password = knockout.observable();
        }
        Login.prototype.Login = function () {
            AuthorizationManager.Authenticate();
        };
        return Login;
    })();

    
    return Login;
});
