class Answer
{
	public Id: string;
	public Data: {[key:string]: string};

	constructor(id:string, data: { [key: string]: string })
	{
		this.Id = id;
		this.Data = data;
	}
}

export = Answer;