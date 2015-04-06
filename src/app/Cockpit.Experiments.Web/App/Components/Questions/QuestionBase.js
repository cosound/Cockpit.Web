define(["require", "exports", "knockout"], function (require, exports, knockout) {
    var QuestionsBase = (function () {
        function QuestionsBase(question, requiresInput) {
            var _this = this;
            if (requiresInput === void 0) { requiresInput = true; }
            this.Model = question;
            this.Model.RequiresInput = requiresInput;
            this.HasAnswer = knockout.computed(function () { return _this.Model.Answer() != null; });
            if (this.HasAnswer()) {
                var answer = this.Model.Answer();
                this._events = answer.Events ? answer.Events : new Array();
            }
            else {
                this._events = new Array();
            }
        }
        QuestionsBase.prototype.GetInstrument = function (key) {
            return this.GetIntrumentObject()[key];
        };
        QuestionsBase.prototype.GetIntrumentObject = function () {
            for (var i = 0; i < this.Model.Input.length; i++) {
                if (this.Model.Input[i].Instrument)
                    return this.Model.Input[i].Instrument;
            }
            throw new Error("Intrument object not found in input");
        };
        QuestionsBase.prototype.GetAsnwer = function () {
            return this.HasAnswer() ? this.Model.Answer() : null;
        };
        QuestionsBase.prototype.SetAnswer = function (answer) {
            answer.Events = this._events;
            this.Model.Answer(answer);
        };
        QuestionsBase.prototype.AddEvent = function (type, id) {
            if (id === void 0) { id = null; }
            var event = {
                Id: id === null ? "None" : id,
                Type: type,
                Method: "None",
                Data: "None",
                DateTime: new Date()
            };
            this._events.push(event);
        };
        QuestionsBase.prototype.SlideLoaded = function () {
        };
        QuestionsBase.prototype.SlideCompleted = function () {
        };
        return QuestionsBase;
    })();
    return QuestionsBase;
});
