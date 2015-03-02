import knockout = require("knockout");
import QuestionBase = require("Components/Questions/QuestionBase");
import QuestionModel = require("Models/Question");

class Monitor extends QuestionBase
{
	constructor(question: QuestionModel)
	{
		super(question, false);
	}

	public SlideCompleted(): void
	{
		this.SetAnswer({ Events: [this.CreateEvent(new Date(), "Slide Completed")], Contexts: [] });
	}

	private CreateEvent(dateTime:Date, type:string):{ DateTime:Date; Type:string; Id:string; Data:string; Method:string }
	{
		return { DateTime: dateTime, Type: type, Id: " ", Data: " ", Method: " " };
	}
}

export = Monitor;