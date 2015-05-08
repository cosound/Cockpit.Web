define(["require", "exports", "knockout", "jquery"], function (require, exports, knockout, jquery) {
    var Audio = (function () {
        function Audio(info) {
            var _this = this;
            this.PlayerElement = knockout.observable();
            this._info = info;
            this.IsPlaying = this._info.IsPlaying;
            this.Sources = this._info.Sources;
            var sub = this.PlayerElement.subscribe(function (e) {
                sub.dispose();
                _this.InitializePlayer(e);
            });
        }
        Audio.prototype.TogglePlay = function () {
            if (this.IsPlaying()) {
                Audio._activePlayer = null;
                this.PlayerElement().pause();
            }
            else {
                if (Audio._activePlayer !== null && Audio._activePlayer !== this)
                    Audio._activePlayer.TogglePlay();
                Audio._activePlayer = this;
                this.PlayerElement().play();
            }
        };
        Audio.prototype.InitializePlayer = function (player) {
            var _this = this;
            var $player = jquery(player);
            $player.on("playing", function () {
                _this._info.IsPlaying(true);
            }).on("pause", function () {
                _this._info.IsPlaying(false);
            });
            this.Sources.forEach(function (s) { return $player.append("<Source type=\"" + s.Type + "\" src=\"" + s.Source + "\"/>"); });
        };
        Audio._activePlayer = null;
        return Audio;
    })();
    return Audio;
});
