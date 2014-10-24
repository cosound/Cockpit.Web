import CockpitPortal = require("CockpitPortal");

class QuestionData
{
	Name: string;
	Data: CockpitPortal.IQuestion;
	UserInput: any;

	constructor(data: CockpitPortal.IQuestion = null)
	{
		this.Name = "Questions/" + data.Fullname.substr(0, data.Fullname.indexOf("Question"));
		this.Data = data;
	}
}

export = QuestionData;