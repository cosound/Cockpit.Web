import SlideModel = require("Models/Slide");
import QuestionModel = require("Models/Question");
import ExperimentManager = require("ExperimentManager");

class Default
{
	private _slide: SlideModel;
	public Questions: QuestionModel[] = [];

	constructor(slide: SlideModel)
	{
		this._slide = slide;

		for (var i = 0; i < slide.Questions.length; i++)
			this.Questions.push(new QuestionModel(slide.Questions[i], question => this.AnswerChanged(question)));
	}

	private AnswerChanged(question: QuestionModel):void
	{
		ExperimentManager.SaveQuestionAnswer(question.Id, question.UserAnswer());

		var allQuestionsAnswered = true;

		for (var i = 0; i < this.Questions.length; i++)
		{
			if (this.Questions[i].UserAnswer() == null)
				allQuestionsAnswered = false;
		}

		this._slide.CanGoToNextSlide(allQuestionsAnswered);
	}
}

export = Default;