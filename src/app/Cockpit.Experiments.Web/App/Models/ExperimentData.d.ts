interface IExperiment
{
	Name:string;
	Slides: ISlide[];
	CompletedSlide:ISlide;
} 

interface ISlide
{
	Type:string;
}

interface ISlideIntro extends ISlide
{
	Text:string;
}

interface ISlideForm extends ISlide
{
	Inputs:IInput[];
}

interface ISlideThankYou extends ISlide
{
	Text:string;
}

interface IInput
{
	Type:string;
}

interface IInputText extends ISlide
{
	Label:string;
}

interface IInputRadio extends ISlide
{
	Label: string;
	Options:string[];
}