interface IExperiment
{
	Name:string;
	Slides: ISlide[];
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