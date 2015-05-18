interface IQuestionViewModel
{
	SlideLoaded(): void;
	SlideCompleted(callback:()=>void):void;
}