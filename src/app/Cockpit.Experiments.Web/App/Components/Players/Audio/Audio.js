define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var Audio = (function () {
        function Audio(info) {
            this.Element = knockout.observable();
            this._info = info;
            this.Sources = this._info.Sources;
        }
        return Audio;
    })();
    return Audio;
});
//# sourceMappingURL=Audio.js.map