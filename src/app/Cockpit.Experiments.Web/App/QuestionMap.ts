var _unsupported = "Unsupported";
var _map: { [key: string]: QuestionMap };

export function Get(key: string) 
{
	var map = _map[key];

	return map != null ? map : _map[_unsupported];
}

function Initialize() 
{
	_map = {
		"Monitor:Event:StartAtDateTime": new QuestionMap("Questions/Start", false),
		"Monitor:Event:EndAtDateTime": new QuestionMap("Questions/End", false),
		"introductions_r001": new QuestionMap("Questions/Introduction"),
		"BooleanQuestion, 1.0": new QuestionMap("Questions/Boolean"),
		"AbQuestion, 1.0": new QuestionMap("Questions/AB")
	};

	_map[_unsupported] = new QuestionMap("Questions/Unsupported", false);
}

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

Initialize();