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
		slide.SlideCompleted = callback => this.SlideCompleted(callback);

		this.InitializeQuestions(slide.Questions);
	}

	private InitializeQuestions(questions: CockpitPortal.IQuestion[]):void
	{
		var numberToLoad = questions.length;
		var loaded = () => { if (--numberToLoad === 0) this.SlideLoaded(); }

		for (var i = 0; i < questions.length; i++)
		{
			var questionModel = new QuestionModel(questions[i], question => this.AnswerChanged(question), loaded);
			questionModel.HasValidAnswer.subscribe(() => this.CheckIfAllQuestionsAreAnswered());
			this.Questions.push(questionModel);

			if (!questionModel.HasUIElement)
				require([NameConventionLoader.GetFilePath(questionModel.Type)],(vm: any) => this._uiLessQuestions.push(new vm(questionModel)));
		}

		if (questions.length === 0)
			this.SlideLoaded();
	}

	private SlideLoaded(): void
	{
		for (var i = 0; i < this._uiLessQuestions.length; i++)
			this._uiLessQuestions[i].SlideLoaded();

		this.CheckIfAllQuestionsAreAnswered();
	}

	private SlideCompleted(completed: () => void):void
	{
		var calls = this._uiLessQuestions.length;

		for (var i = 0; i < this._uiLessQuestions.length; i++)
		{
			this._uiLessQuestions[i].SlideCompleted(() =>
			{
				if (--calls === 0) completed();
			});
		}
	}

	private AnswerChanged(question: QuestionModel):void
	{
		if (question.HasValidAnswer())
			ExperimentManager.SaveQuestionAnswer(question.Id, question.Answer());

		this.CheckIfAllQuestionsAreAnswered();
	}

	private CheckIfAllQuestionsAreAnswered():void
	{
		var allQuestionsAnswered = true;

		for (var i = 0; i < this.Questions.length; i++)
		{
			if (this.Questions[i].RequiresInput && !this.Questions[i].HasValidAnswer())
				allQuestionsAnswered = false;
		}

		this._slide.CanGoToNextSlide(allQuestionsAnswered);
	}
}

export = Default;