define(["require", "exports", "knockout", "jquery"], function (require, exports, knockout, jquery) {
    var Audio = (function () {
        function Audio(info) {
            var _this = this;
            this.PlayerElement = knockout.observable();
            this._info = info;
            this.Sources = this._info.Sources;
            var sub = this.PlayerElement.subscribe(function (e) {
                sub.dispose();
                _this.InitializePlayer(e);
            });
        }
        Audio.prototype.InitializePlayer = function (player) {
            var _this = this;
            jquery(player).on("playing", function () {
                _this._info.IsPlaying(true);
            }).on("pause", function () {
                _this._info.IsPlaying(true);
            });
        };
        return Audio;
    })();
    return Audio;
});
//# sourceMappingURL=Audio.js.map