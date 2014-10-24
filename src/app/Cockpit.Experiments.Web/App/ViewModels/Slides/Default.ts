import SlideData = require("Models/SlideData");
import QuestionData = require("Models/QuestionData");

class Default
{
	public Questions: QuestionData[] = [];

	constructor(slideData: SlideData)
	{
		for (var i = 0; i < slideData.Data.Questions.length; i++)
			this.Questions.push(new QuestionData(slideData.Data.Questions[i]));
	}
}

export = Default;