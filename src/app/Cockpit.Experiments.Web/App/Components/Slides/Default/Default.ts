import SlideModel = require("Models/Slide");
import QuestionModel = require("Models/Question");
import ExperimentManager = require("Managers/Experiment");
import CockpitPortal = require("CockpitPortal");
import NameConventionLoader = require("Components/NameConventionLoader");

class Default
{
	private _slide: SlideModel;
	private _uiLessQuestions: IQuestionViewModel[] = [];
	public Questions: QuestionModel[] = [];

	constructor(slide: SlideModel)
	{
		this._slide = slide;
		slide.SlideCompleted = () => this.SlideCompleted();

		this.InitializeQuestions(slide.Questions);
	}

	private InitializeQuestions(questions: CockpitPortal.IQuestion[]):void
	{
		var isFinished = false;
		var numberToLoad = 0;
		var uiLessLoader = (model: QuestionModel) =>
		{
			numberToLoad++;
			require([NameConventionLoader.GetFilePath(model.Type)], (vm: any) =>
			{
				this._uiLessQuestions.push(new vm(model));

				if (isFinished && --numberToLoad == 0) this.SlideLoaded();
			});
		}

		for (var i = 0; i < questions.length; i++)
		{
			var questionModel = new QuestionModel(questions[i], question => this.AnswerChanged(question));
			this.Questions.push(questionModel);

			if (!questionModel.HasUIElement) uiLessLoader(questionModel);
		}

		if (numberToLoad == 0)
			this.SlideLoaded();
		else
			isFinished = true;
	}

	private SlideLoaded(): void
	{
		for (var i = 0; i < this._uiLessQuestions.length; i++)
			this._uiLessQuestions[i].SlideLoaded();
	}

	private SlideCompleted():void
	{
		for (var i = 0; i < this._uiLessQuestions.length; i++)
			this._uiLessQuestions[i].SlideCompleted();
	}

	private AnswerChanged(question: QuestionModel):void
	{
		ExperimentManager.SaveQuestionAnswer(question.Id, question.UserAnswer());

		var allQuestionsAnswered = true;

		for (var i = 0; i < this.Questions.length; i++)
		{
			if (this.Questions[i].RequiresInput && this.Questions[i].UserAnswer() == null)
				allQuestionsAnswered = false;
		}

		this._slide.CanGoToNextSlide(allQuestionsAnswered);
	}
}

export = Default;