import knockout = require("knockout");
import Input = require("ViewModels/Slides/Input");

class Intro
{
	public Inputs: Input[]  = [];

	private CanGoToNextSlide: KnockoutObservable<boolean>;
	private _UserInput:KnockoutObservable<string>;

	constructor(data: any)
	{
		var slide = <ISlideForm>data.Slide;

		this.CanGoToNextSlide = data.CanGoToNextSlide;

		this.AddInputs(slide.Inputs);
		this._UserInput = data.UserInput;
	}

	private AddInputs(inputs:IInput[]):void
	{
		inputs.forEach(v =>
		{
			var input = new Input(v);
			this.Inputs.push(input);
			
			input.Value.subscribe(t =>
			{
				var noValue = false;
				var totalValue = new Array<string>();

				this.Inputs.forEach(i =>
				{
					noValue = noValue || i.Value() == null;
					totalValue.push(i.Configuration.Type + "=" + i.Value());
				});

				this._UserInput(totalValue.join(", "));

				this.CanGoToNextSlide(!noValue);
			});
		});
	}
}

export = Intro;