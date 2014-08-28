define(["require", "exports"], function(require, exports) {
    var Participant = (function () {
        function Participant(email, response) {
            this.Email = email;
            this.Response = response;
        }
        return Participant;
    })();

    
    return Participant;
});
