define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var AudioInfo = (function () {
        function AudioInfo(sources) {
            this.IsPlaying = knockout.observable(false);
            this.Sources = sources;
        }
        AudioInfo.prototype.AddIsPlayingCallback = function (callback) {
            this.IsPlaying.subscribe(function (v) { return callback(v); });
        };
        return AudioInfo;
    })();
    return AudioInfo;
});
//# sourceMappingURL=AudioInfo.js.map