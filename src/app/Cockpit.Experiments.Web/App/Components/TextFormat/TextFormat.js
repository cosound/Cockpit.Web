define(["require", "exports", "knockout", "Managers/TextFormatter"], function (require, exports, knockout, TextFormatter) {
    var TextFormat = (function () {
        function TextFormat() {
            var _this = this;
            this.Input = knockout.observable("Lorem {{b|ipsum}} dolor sit amet, {{i|consectetur}} adipiscing elit. {{u|Quisque}} porta pulvinar erat. {{s|Suspendisse}} a tel{{sub|lus}} odi{{super|o}}. {{mark|Vivamus}} ac libero. Fusce {{tiny|ornare}} nisl in {{small|augue}} tristique, non {{large|fermentum}} metus lobortis. Quis nisi {{color|green|finibus}} ornare. Proin {{color|#ffaaff|semper}} sapien. Quisque {{style|font-variant: small-caps;border: 1px solid magenta;|fermentum}} quis risus vitae posuere. Vitae {{url|http://refrain.dk}} est egestas {{url|http://refrain.dk|blandit}}. Aliquam erat volutpat. Quisque fermentum quis {{n}} risus vitae posuere. Morbi{{tab}}sagittis diam in leo {{b|vestibulum {{s|dapibus}}. Cras}} rhoncus faucibus libero, id ullamcorper mi suscipit sit amet. {{right|Integer orci felis, imperdiet vitae felis ac, cursus iaculis elit.}}{{center|Integer orci felis, imperdiet vitae felis ac, cursus iaculis elit.}}{{justify|Integer orci felis, imperdiet vitae felis ac, cursus iaculis elit.}} Praesent blandit tincidunt pretium. Fusce ornare nisl in augue tristique, non fermentum metus lobortis. Pellentesque cursus fringilla lobortis. In blandit nisi et lacus placerat, sed blandit nunc pharetra. Lorem ipsum dolor sit amet, consectetur.");
            this.Output = knockout.computed(function () { return _this.Input() ? TextFormatter.Format(_this.Input()) : ""; });
            this.Examples = this.CreateExamples("{{b|Bold}}", "{{i|Italic}}", "{{u|Underlined}}", "{{s|Strikethrough}}", "Sub{{sub|script}}", "Super{{super|script}}", "{{mark|Marked}}", "{{tiny|Tiny}}", "{{small|Small}}", "{{large|Large}}", "{{color|red|Color}}", "{{style|color: green;font-variant: small-caps;|Styled}}", "{{link|http://www.google.com|Link}}", "New{{n}}line", "Tab{{tab}}space", "{{left|Left aligned}}", "{{right|Right aligned}}", "{{center|Center aligned}}", "{{justify|Justify aligned}}");
        }
        TextFormat.prototype.CreateExamples = function () {
            var codes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                codes[_i - 0] = arguments[_i];
            }
            return codes.map(function (c) {
                return { Code: c, Result: TextFormatter.Format(c) };
            });
        };
        return TextFormat;
    })();
    return TextFormat;
});
