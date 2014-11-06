export class QuestionMap
{
	public Type: string;
	public HasUIElement: boolean;

	constructor(type: string, hasUIElement: boolean = true)
	{
		this.Type = type;
		this.HasUIElement = hasUIElement;
	}
}

export var Map: { [key: string]: QuestionMap } = {
	"Monitor:Event:StartAtDateTime"	: new QuestionMap("Questions/Start", false),
	"Monitor:Event:EndAtDateTime"	: new QuestionMap("Questions/End", false),
	"introductions_r001"			: new QuestionMap("Questions/Introduction"),
	"BooleanQuestion, 1.0"			: new QuestionMap("Questions/Boolean"),
	"AbQuestion, 1.0"				: new QuestionMap("Questions/AB"),
}