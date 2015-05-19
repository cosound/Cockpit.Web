class ExperimentNotFound
{
	public Id:string;

	constructor(data:string)
	{
		console.log(data);
		this.Id = data;
	}
}

export = ExperimentNotFound;