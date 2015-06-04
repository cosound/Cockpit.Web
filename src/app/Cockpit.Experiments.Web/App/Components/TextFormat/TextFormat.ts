import knockout = require("knockout");
import TextFormatter = require("Managers/TextFormatter");

class TextFormat
{
	public Input: KnockoutObservable<string> = knockout.observable<string>("Lorem {{b|ipsum}} dolor sit amet, {{i|consectetur}} adipiscing elit. {{u|Quisque}} porta pulvinar erat. {{s|Suspendisse}} a tel{{sub|lus}} odi{{super|o}}. {{mark|Vivamus}} ac libero. Fusce {{tiny|ornare}} nisl in {{small|augue}} tristique, non {{large|fermentum}} metus lobortis. Quis nisi {{color|green|finibus}} ornare. Proin {{color|#ffaaff|semper}} sapien. Quisque {{style|font-variant: small-caps;border: 1px solid magenta;|fermentum}} quis risus vitae posuere. Vitae {{url|http://refrain.dk}} est egestas {{url|http://refrain.dk|blandit}}. {{image|App/Images/DTULogo.png|15|30}}Aliquam erat volutpat. Quisque fermentum quis {{n}} risus vitae posuere. Morbi{{tab}}sagittis diam in leo {{b|vestibulum {{s|dapibus}}. Cras}} rhoncus faucibus libero, id ullamcorper mi suscipit sit amet. {{right|Integer orci felis, imperdiet vitae felis ac, cursus iaculis elit.}}{{center|Integer orci felis, imperdiet vitae felis ac, cursus iaculis elit.}}{{justify|Integer orci felis, imperdiet vitae felis ac, cursus iaculis elit.}} Praesent blandit tincidunt pretium. Fusce ornare nisl in augue tristique, non fermentum metus lobortis. {{image|App/Images/DTULogo.png|left}} Pellentesque cursus fringilla lobortis. In blandit nisi et lacus placerat, sed blandit nunc pharetra. Lorem ipsum dolor sit amet, consectetur.");
	public Output: KnockoutComputed<string>;

	public Examples: FormatExample[];

	constructor()
	{
		this.Output = knockout.computed(() => this.Input() ? TextFormatter.Format(this.Input()) : "");
		this.Examples = this.CreateExamples("{{b|Bold}}", "{{i|Italic}}", "{{u|Underlined}}", "{{s|Strikethrough}}", "Sub{{sub|script}}",
			"Super{{super|script}}", "{{mark|Marked}}", "{{tiny|Tiny}}", "{{small|Small}}", "{{large|Large}}", "{{color|red|Color}}",
			"{{style|color: green;font-variant: small-caps;|Styled}}", "{{link|http://www.google.com|Link}}", "{{image|App/Images/DTULogo.png|30|30|right}}", "New{{n}}line", "Tab{{tab}}space",
			"{{left|Left aligned}}", "{{right|Right aligned}}", "{{center|Center aligned}}", "{{justify|Justify aligned}}");
	}

	private CreateExamples(... codes:string[]):FormatExample[]
	{
		return codes.map(c => { return { Code: c, Result: TextFormatter.Format(c) } });
	}
}

type FormatExample =
{
	Code:string;
	Result: string;
};

export = TextFormat;