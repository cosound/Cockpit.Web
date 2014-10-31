class Answer
{
	public Type: string;
	public Data: {[key:string]: string};

	constructor(type: string, data: { [key: string]: string })
	{
		this.Type = type;
		this.Data = data;
	}
}

export = Answer;