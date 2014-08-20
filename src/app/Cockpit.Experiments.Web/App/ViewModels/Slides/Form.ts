import knockout = require("knockout");
import Input = require("ViewModels/Slides/Input");

class Intro
{
	public Inputs: Input[]  = [];

	private CanGoToNextSlide:KnockoutObservable<boolean>;

	constructor(data: any)
	{
		var slide = <ISlideForm>data.Slide;

		this.CanGoToNextSlide = data.CanGoToNextSlide;

		this.AddInputs(slide.Inputs);
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
				this.Inputs.forEach(i => noValue = noValue || i.Value() == null);

				this.CanGoToNextSlide(!noValue);
			});
		});
	}
}

export = Intro;