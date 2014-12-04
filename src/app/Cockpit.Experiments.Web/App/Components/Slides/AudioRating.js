define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var AudioRating = (function () {
        function AudioRating(data) {
            var _this = this;
            this.Value = knockout.observable(0.5);
            this.Configuration = data.Slide;

            this._canGoToNextSlide = data.CanGoToNextSlide;

            this._valueSubscription = this.Value.subscribe(function (v) {
                data.UserInput(v);
                _this._canGoToNextSlide(true);
            });
        }
        AudioRating.prototype.dispose = function () {
            this._valueSubscription.dispose();
            this._valueSubscription = null;
        };
        return AudioRating;
    })();

    
    return AudioRating;
});
//# sourceMappingURL=AudioRating.js.map
