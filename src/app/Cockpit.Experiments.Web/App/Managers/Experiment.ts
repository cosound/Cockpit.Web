import knockout = require("knockout");
import CockpitPortal = require("CockpitPortal");
import Navigation = require("Managers/Navigation");
import Title = require("Managers/Title");
import Notification = require("Managers/Notification");
import CallRepeater = require("Managers/CallRepeater");
import CallQueue = require("Managers/CallQueue");

class Experiment
{
	public IsReady: KnockoutObservable<boolean> = knockout.observable<boolean>(false);

	public CurrentSlideIndex: KnockoutObservable<number> = knockout.observable(0);
	public NumberOfSlides: KnockoutObservable<number> = knockout.observable<number>(0);

	public IsExperimentCompleted: KnockoutObservable<boolean> = knockout.observable(false);

	public Title: KnockoutObservable<string> = knockout.observable("");
	public SlideTitle: KnockoutObservable<string> = knockout.observable("");
	public FooterLabel: KnockoutObservable<string> = knockout.observable(null);
	public StyleSheet: KnockoutObservable<string> = knockout.observable(null);
	public CompletedUrl: KnockoutObservable<string> = knockout.observable(null);
	public ScrollToInvalidAnswerDuration:number = 2000;

	public CloseExperimentEnabled: KnockoutComputed<boolean>;
	public CloseSlidesEnabled: KnockoutObservable<boolean> = knockout.observable(false);
	public GoToPreviousSlideEnabled: KnockoutObservable<boolean> = knockout.observable(true);
	
	private _id: string;
	private _hasLoadedCurrentSlide: boolean = false;
	private _listExperiments: { [listId: string]: string } = {};
	private _callQueue: CallQueue;

	private _styleSheetElement:HTMLLinkElement;

	constructor()
	{
		this.StyleSheet.subscribe(path =>
		{
			if (this._styleSheetElement != null)
				document.head.removeChild(this._styleSheetElement);

			if (path != null)
			{
				this._styleSheetElement = document.createElement("link");
				this._styleSheetElement.rel = "stylesheet";
				this._styleSheetElement.type = "text/css";
				this._styleSheetElement.href = path;
				document.head.appendChild(this._styleSheetElement);
			}
		});
		this.Title.subscribe(title => Title.ToDefault(title == "" ? null : title));

		this.CloseExperimentEnabled = knockout.computed(() => this.CompletedUrl() != null);
		this._callQueue = new CallQueue(true);

		Navigation.ExperimentId.subscribe(id =>
		{
			if(id != null) this.Load(id);
		});
		Navigation.ExperimentListId.subscribe(id =>
		{
			if (id != null) this.LoadNext(id);
		});
		if (Navigation.ExperimentId() != null)
			this.Load(Navigation.ExperimentId());
		else if (Navigation.ExperimentListId() != null)
			this.LoadNext(Navigation.ExperimentListId());
	}

	public ExperimentCompleted():void
	{
		this.IsExperimentCompleted(true);
	}

	public Load(id: string): void
	{
		this._id = id;

		this.IsReady(false);
		this._hasLoadedCurrentSlide = false;

		CockpitPortal.Experiment.Get(this._id).WithCallback(response =>
		{
			if (response.Error != null)
			{
				Notification.Error(`Failed to load Experiment: ${response.Error.Message}`);
				Navigation.Navigate(`ExperimentNotFound/${id}`);
				return;
			}
			if (response.Body.Results.length === 0)
			{
				Navigation.Navigate(`ExperimentNotFound/${id}`);
				Notification.Error("No Experiment data retuened");
				return;
			}

			var config = response.Body.Results[0];

			this.Title(config.Name);
			this.CloseSlidesEnabled(config.LockQuestion);
			this.GoToPreviousSlideEnabled(config.EnablePrevious);
			this.FooterLabel(config.FooterLabel);
			this.CurrentSlideIndex(config.CurrentSlideIndex);
			this.IsExperimentCompleted(false);
			this.StyleSheet(config.Css);
			this.CompletedUrl(config.RedirectOnCloseUrl);

			this.IsReady(true);
		});
	}

	public LoadNext(listId:string):void
	{
		if (this._listExperiments[listId])
		{
			Navigation.Navigate(`Experiment/${this._listExperiments[listId]}`);
			return;
		}

		CockpitPortal.Experiment.Next(listId).WithCallback(response =>
		{
			if (response.Error != null)
			{
				Navigation.Navigate("NoMoreExperiments");
				return;
			}

			if (response.Body.Results.length === 0)
				Navigation.Navigate("NoMoreExperiments");
			else
			{
				this._listExperiments[listId] = response.Body.Results[0].Id;

				Navigation.Navigate(`Experiment/${response.Body.Results[0].Id}`);
			}
		});
	}

	public LoadNextSlide(callback: (slideIndex:number, questions: CockpitPortal.IQuestion[]) => void):void
	{
		this.LoadSlide(this.CurrentSlideIndex() + (this._hasLoadedCurrentSlide ? 1 : 0), callback);
	}

	public LoadPreviousSlide(callback: (slideIndex: number, questions: CockpitPortal.IQuestion[]) => void): void
	{
		this.LoadSlide(this.CurrentSlideIndex() +  -1, callback);
	}

	private LoadSlide(index: number, callback: (slideIndex:number, questions: CockpitPortal.IQuestion[]) => void): void
	{
		CockpitPortal.Question.Get(this._id, index).WithCallback(response =>
		{
			if (response.Error != null)
			{
				if (response.Error.Fullname === "Chaos.Cockpit.Core.Core.Exceptions.SlideLockedException")
					Navigation.Navigate("SlideLocked");
				else if (response.Error.Message === "No Questionaire found by that Id")
					Navigation.Navigate(`ExperimentNotFound/${this._id}`);
				else
					Notification.Error(`Failed to get slide: ${response.Error.Message}`);

				return;
			}

			if (response.Body.Count === 0)
			{
				Notification.Error("No slide returned");
				return;
			}

			this.NumberOfSlides(response.Body.FoundCount);

			this._hasLoadedCurrentSlide = true;
			this.CurrentSlideIndex(index);

			callback(index, response.Body.Results);
		});
	}

	public SaveQuestionAnswer(id: string, answer: any, callback: (success:boolean) => void): void
	{
		this._callQueue.Queue(id, new CallRepeater((c) =>
		{
			CockpitPortal.Answer.Set(id, answer).WithCallback(response =>
			{
				if (response.Error != null)
				{
					if (response.Error.Fullname !== "Chaos.Cockpit.Core.Core.Exceptions.ValidationException")
					{
						c(false, false);
						Notification.Error(`Failed to save answer: ${response.Error.Message}`);
					} else
						c(false, true);
				} else
					c(true, false);
			});
		}, callback));
	}

	public CloseSlide(index: number): void
	{
		CockpitPortal.Slide.Completed(this._id, index).WithCallback(response =>
		{
			if (response.Error != null)
				Notification.Error(`Failed to close slide: ${response.Error.Message}`);
		});
	}

	public Close():any
	{
		document.location.href = this.CompletedUrl();
	}
}

var instance = new Experiment();

export = instance;