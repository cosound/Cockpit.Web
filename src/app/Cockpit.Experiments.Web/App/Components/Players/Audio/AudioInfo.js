define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var AudioInfo = (function () {
        function AudioInfo(sources) {
            this.IsPlaying = knockout.observable(false);
            this.Sources = sources;
        }
        return AudioInfo;
    })();
    return AudioInfo;
});
//# sourceMappingURL=AudioInfo.js.map