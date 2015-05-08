define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var AudioInfo = (function () {
        function AudioInfo(sources) {
            this.IsPlaying = knockout.observable(false);
            this.Sources = sources;
        }
        AudioInfo.prototype.AddIsPlayingCallback = function (callback) {
            this.IsPlaying.subscribe(function (v) { return callback(v); });
        };
        AudioInfo.Create = function (stimulus) {
            if (stimulus === null)
                return null;
            return new AudioInfo([{ Type: stimulus.Type, Source: stimulus.URI }]);
        };
        return AudioInfo;
    })();
    return AudioInfo;
});
