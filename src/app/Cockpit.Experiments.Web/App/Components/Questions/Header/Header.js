var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Components/Questions/QuestionBase"], function (require, exports, QuestionBase) {
    var Header = (function (_super) {
        __extends(Header, _super);
        function Header(question) {
            _super.call(this, question, false);
        }
        Header.prototype.SlideLoaded = function () {
        };
        Header.prototype.SlideCompleted = function () {
            return false;
        };
        return Header;
    })(QuestionBase);
    return Header;
});
