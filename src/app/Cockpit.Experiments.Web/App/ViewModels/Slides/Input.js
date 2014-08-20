define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var Input = (function () {
        function Input(configuration) {
            this.Value = knockout.observable(null);
            this.Configuration = configuration;
        }
        return Input;
    })();

    
    return Input;
});
//# sourceMappingURL=Input.js.map
