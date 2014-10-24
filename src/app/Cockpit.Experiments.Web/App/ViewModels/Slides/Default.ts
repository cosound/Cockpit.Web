import SlideData = require("Models/SlideData");
import QuestionData = require("Models/QuestionData");

class Default
{
	private _slideData:SlideData;
	public Questions: QuestionData[] = [];

	constructor(slideData: SlideData)
	{
		this._slideData = slideData;

		for (var i = 0; i < slideData.Data.Questions.length; i++)
			this.Questions.push(new QuestionData(slideData.Data.Questions[i], () => this.AnswerChanged()));
	}

	private AnswerChanged():void
	{
		var allQuestionsAnswered = true;

		for (var i = 0; i < this.Questions.length; i++)
		{
			if (this.Questions[i].UserInput() == null)
			{
				allQuestionsAnswered = false;
				break;
			}
		}

		this._slideData.CanGoToNextSlide(allQuestionsAnswered);
	}
}

export = Default;