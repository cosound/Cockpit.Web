import QuestionModel = require("Models/Question");
import FreetextBase = require("Components/Questions/Freetext/FreetextBase");
import CryptoJS = require("crypto-js");

type Answer = { Value:string; Length:number };

class FreetextHash extends FreetextBase<Answer>
{
	private _forceLowerCase:boolean;

	constructor(question: QuestionModel)
	{
		super(question);

		this._forceLowerCase = this.GetInstrument("ForceLowerCase") === 1;

		this.Answer.subscribe(v =>
		{
			this.SetAnswer(this.SaveAnswerAnswer(v));
		});
	}

	protected LoadAnswer(answer: Answer): void
	{
		
	}

	protected SaveAnswerAnswer(answer: string): Answer
	{
		return { Value: CryptoJS.MD5(this._forceLowerCase ? answer.toLocaleLowerCase() : answer).toString(), Length: answer.length };
	}
}

export = FreetextHash;