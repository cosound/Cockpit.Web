import knockout = require("knockout");
import TextFormatter = require("Managers/TextFormatter");

class TextFormat
{
	public Input: KnockoutObservable<string> = knockout.observable<string>("Lorem {{b|ipsum}} dolor sit amet, {{i|consectetur}} adipiscing elit. {{u|Quisque}} porta pulvinar erat. {{s|Suspendisse}} a tellus odio. {{mark|Vivamus}} ac libero. Fusce {{tiny|ornare}} nisl in {{small|augue}} tristique, non {{large|fermentum}} metus lobortis. Quis nisi {{color|green|finibus}} ornare. Proin {{color|#ffaaff|semper}} sapien. Quisque {{style|font-variant: small-caps;border: 1px solid magenta;|fermentum}} quis risus vitae posuere. Vitae {{url|http://refrain.dk}} est egestas {{url|http://refrain.dk|blandit}}. Aliquam erat volutpat. Quisque fermentum quis {{n}} risus vitae posuere. Morbi sagittis diam in leo {{b|vestibulum {{s|dapibus}}. Cras}} rhoncus faucibus libero, id ullamcorper mi suscipit sit amet. Integer orci felis, imperdiet vitae felis ac, cursus iaculis elit. Praesent blandit tincidunt pretium. Fusce ornare nisl in augue tristique, non fermentum metus lobortis. Pellentesque cursus fringilla lobortis. In blandit nisi et lacus placerat, sed blandit nunc pharetra. Lorem ipsum dolor sit amet, consectetur.");
	public Output:KnockoutComputed<string>;

	constructor()
	{
		this.Output = knockout.computed(() => this.Input() ? TextFormatter.Format(this.Input()) : "");
	}
}

export = TextFormat;