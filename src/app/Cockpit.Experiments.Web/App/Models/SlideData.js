define(["require", "exports"], function(require, exports) {
    var SlideData = (function () {
        function SlideData(name, canGoToNextSlide, data) {
            if (typeof canGoToNextSlide === "undefined") { canGoToNextSlide = null; }
            if (typeof data === "undefined") { data = null; }
            this.Name = name;
            this.CanGoToNextSlide = canGoToNextSlide;
            this.Data = data;
        }
        return SlideData;
    })();

    
    return SlideData;
});
//# sourceMappingURL=SlideData.js.map
