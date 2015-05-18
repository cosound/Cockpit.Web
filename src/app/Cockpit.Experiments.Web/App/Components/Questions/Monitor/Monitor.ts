import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class Monitor extends QuestionBase
{
	constructor(question: QuestionModel)
	{
		super(question, false);
	}

	public SlideLoaded(): void
	{
		this.AddEvent("Start", "/", "Monitor");

		this.SetAnswer({ Context: { Type: "UserAgent", Data: navigator.userAgent}, TimeZone: { Offset: new Date().getTimezoneOffset()} });
	}

	public SlideCompleted(callback:()=>void): void
	{
		this.AddEvent("Stop", "/", "Monitor");

		this.SetAnswer({ Context: { Type: "UserAgent", Data: navigator.userAgent } });

		callback(); //TODO: Call when answer is set
	}
}

export = Monitor;