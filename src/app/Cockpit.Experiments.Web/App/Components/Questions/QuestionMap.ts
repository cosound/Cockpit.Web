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
		"Monitor": new QuestionMap("Questions/Monitor", false),
		"Header": new QuestionMap("Questions/Header", false),
		"introductions_r001": new QuestionMap("Questions/Introduction"),
		"BooleanQuestion, 1.0": new QuestionMap("Questions/Boolean"),
		"AbQuestion, 1.0": new QuestionMap("Questions/AB"),
		"RadioButtonGroup": new QuestionMap("Questions/RadioButtonGroup"),
		"CheckBoxGroup": new QuestionMap("Questions/CheckBoxGroup"),
		"Freetext": new QuestionMap("Questions/Freetext"),
		"FreetextHash": new QuestionMap("Questions/FreetextHash"),
		"OneDScale": new QuestionMap("Questions/OneDScale"),
		"TwoDScale": new QuestionMap("Questions/ContinousScale2D"),
		"TwoDKScaleDD": new QuestionMap("Questions/TwoDScaleK"),
		"TextBlock": new QuestionMap("Questions/TextBlock"),
		"LikertScale": new QuestionMap("Questions/LikertScale"),
		"KacPS": new QuestionMap("Questions/KAcPS")
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