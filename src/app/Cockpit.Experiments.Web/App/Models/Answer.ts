class Answer
{
	public Id: string;
	public Data: {[key:string]: any};

	constructor(id: string, data: { [key: string]: any })
	{
		this.Id = id;
		this.Data = data;
	}
}

export = Answer;