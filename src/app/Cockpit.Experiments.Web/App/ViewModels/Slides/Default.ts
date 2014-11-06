import SlideModel = require("Models/Slide");
import QuestionModel = require("Models/Question");
import ExperimentManager = require("ExperimentManager");

class Default
{
	private _slide: SlideModel;
	private _uiLessQuestions:any[] = [];
	public Questions: QuestionModel[] = [];

	constructor(slide: SlideModel)
	{
		this._slide = slide;

		for (var i = 0; i < slide.Questions.length; i++)
		{
			var questionModel = new QuestionModel(slide.Questions[i], question => this.AnswerChanged(question));
			this.Questions.push(questionModel);

			if (!questionModel.HasUIElement)
			{
				require(["ViewModels/" + questionModel.Type], (vm:any) =>
				{
					this._uiLessQuestions.push(new vm(questionModel));
				});
			}
		}
	}

	private AnswerChanged(question: QuestionModel):void
	{
		ExperimentManager.SaveQuestionAnswer(question.Id, question.UserAnswer());

		var allQuestionsAnswered = true;

		for (var i = 0; i < this.Questions.length; i++)
		{
			if (this.Questions[i].HasInput && this.Questions[i].UserAnswer() == null)
				allQuestionsAnswered = false;
		}

		this._slide.CanGoToNextSlide(allQuestionsAnswered);
	}
}

export = Default;