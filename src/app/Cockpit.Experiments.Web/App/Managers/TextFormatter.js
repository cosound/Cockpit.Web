define(["require", "exports"], function (require, exports) {
    var TextFormatter = (function () {
        function TextFormatter() {
            var _this = this;
            this._formatFinder = /\{\{((?:(?!\{\{).)+?)\}\}/g;
            this._formatters = {
                "b": function (i) { return ("<b>" + i[0] + "</b>"); },
                "i": function (i) { return ("<i>" + i[0] + "</i>"); },
                "u": function (i) { return ("<u>" + i[0] + "</u>"); },
                "s": function (i) { return ("<s>" + i[0] + "</s>"); },
                "sub": function (i) { return ("<sub>" + i[0] + "</sub>"); },
                "super": function (i) { return ("<sup>" + i[0] + "</sup>"); },
                "mark": function (i) { return ("<mark>" + i[0] + "</mark>"); },
                "tiny": function (i) { return ("<span class=\"Tiny\">" + i[0] + "</span>"); },
                "small": function (i) { return ("<span class=\"Small\">" + i[0] + "</span>"); },
                "large": function (i) { return ("<span class=\"Large\">" + i[0] + "</span>"); },
                "color": function (i) { return ("<span style=\"color:" + i[0] + "\">" + i[1] + "</span>"); },
                "style": function (i) { return ("<span style=\"" + i[0] + "\">" + i[1] + "</span>"); },
                "url": function (i) { return ("<a target=\"_blank\" href=\"" + i[0] + "\">" + (i.length === 1 ? i[0] : i[1]) + "</a>"); },
                "link": function (i) { return ("<a target=\"_blank\" href=\"" + i[0] + "\">" + (i.length === 1 ? i[0] : i[1]) + "</a>"); },
                "image": function (i) { return _this.GetImageFormat(i); },
                "n": function (i) { return "<br/>"; },
                "tab": function (i) { return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"; },
                "left": function (i) { return ("<span class=\"SingleLineLeft\">" + i[0] + "</span>"); },
                "right": function (i) { return ("<span class=\"SingleLineRight\">" + i[0] + "</span>"); },
                "center": function (i) { return ("<span class=\"SingleLineCenter\">" + i[0] + "</span>"); },
                "justify": function (i) { return ("<span class=\"SingleLineJustify\">" + i[0] + "</span>"); }
            };
        }
        TextFormatter.prototype.Format = function (input) {
            var _this = this;
            if (input == null)
                return null;
            var result;
            input = this.EscapeHtml(input);
            while (input !== (result = input.replace(this._formatFinder, function (m, f) { return _this.Replace(f); })))
                input = result;
            return result;
        };
        TextFormatter.prototype.Replace = function (optionsString) {
            var options = optionsString.split("|");
            if (options[0].toLocaleLowerCase() in this._formatters)
                return this._formatters[options[0].toLocaleLowerCase()](options.slice(1));
            return "[Uknown format type: " + options[0].toLocaleLowerCase() + "]";
        };
        TextFormatter.prototype.EscapeHtml = function (input) {
            return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        };
        TextFormatter.prototype.GetImageFormat = function (parameters) {
            var width = "";
            var height = "";
            var style = "";
            if (parameters.length > 1) {
                var second = parameters[1].toLocaleLowerCase();
                if (second === "left" || second === "right") {
                    style = "style=\"float: " + second + ";\"";
                }
                else {
                    width = "width=\"" + second + "\"";
                    if (parameters.length === 2)
                        height = "height=\"" + second + "\"";
                    else {
                        height = "height=\"" + parameters[2] + "\"";
                        if (parameters.length > 3)
                            style = "style=\"float: " + parameters[3] + ";\"";
                    }
                }
            }
            return "<img src=\"" + parameters[0] + "\" " + width + " " + height + " " + style + "/>";
        };
        return TextFormatter;
    })();
    var instance = new TextFormatter();
    return instance;
});
