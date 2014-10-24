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

		var data:string[] = [];

		for (var i = 0; i < this.Questions.length; i++)
		{
			var question = this.Questions[i];
			var answer = question.UserInput();

			if (answer == null)
				allQuestionsAnswered = false;
			else
				data.push(question.Data.Id + ": " + answer);
		}

		this._slideData.UserInput = data.join(", ");
		this._slideData.CanGoToNextSlide(allQuestionsAnswered);
	}
}

export = Default;