define(["require", "exports", "knockout"], function(require, exports, knockout) {
    var AudioRating = (function () {
        function AudioRating(data) {
            var _this = this;
            this.StreamUrl = knockout.observable();
            this.RatingLabel = knockout.observable();
            this.Value = knockout.observable(0.5);
            var slide = data.Slide;

            this._canGoToNextSlide = data.CanGoToNextSlide;

            this.StreamUrl(slide.StreamUrl);
            this.RatingLabel(slide.RatingLabel);

            this._ValueSubscription = this.Value.subscribe(function (v) {
                data.UserInput(v);
                _this._canGoToNextSlide(true);
            });
        }
        AudioRating.prototype.dispose = function () {
            this._ValueSubscription.dispose();
            this._ValueSubscription = null;
        };
        return AudioRating;
    })();

    
    return AudioRating;
});
//# sourceMappingURL=AudioRating.js.map
