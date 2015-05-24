import QuestionModel = require("Models/Question");
import FreeText = require("Components/Questions/Freetext/Freetext");
import CryptoJS = require("crypto-js");

class FreetextHash extends FreeText
{
	private _forceLowerCase:boolean;

	constructor(question: QuestionModel)
	{
		super(question);

		this._forceLowerCase = this.GetInstrument("ForceLower") === 1;
	}

	protected LoadAnswer(answer: any): void
	{
		
	}

	protected SaveAnswerAnswer(answer: string): any
	{
		return { Value: CryptoJS.MD5(this._forceLowerCase ? answer.toLocaleLowerCase() : answer).toString(), Length: answer.length };
	}
}

export = FreetextHash;