define(["require", "exports", "knockout", "Managers/Authorization", "Managers/Title"], function (require, exports, knockout, Authorization, Title) {
    var Login = (function () {
        function Login() {
            var _this = this;
            this.Email = knockout.observable("");
            this.Password = knockout.observable("");
            this.RememberLogin = knockout.observable(false);
            this.HasLoginFailed = knockout.observable(false);
            this.IsAuthorizing = Authorization.IsAuthorizing;
            this.CanLogin = knockout.computed(function () { return _this.Email() && _this.Password() && !_this.IsAuthorizing(); });
            Title.ToDefault("Login");
        }
        Login.prototype.Login = function () {
            var _this = this;
            if (!this.CanLogin())
                return;
            this.HasLoginFailed(false);
            Authorization.Login(this.Email(), this.Password(), this.RememberLogin(), function () { return _this.HasLoginFailed(true); });
        };
        return Login;
    })();
    return Login;
});
