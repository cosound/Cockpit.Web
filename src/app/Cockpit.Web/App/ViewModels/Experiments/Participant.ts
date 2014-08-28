class Participant
{
	public Email: string;
	public Response:string;

	constructor(email:string, response:string)
	{
		this.Email = email;
		this.Response = response;
	}
}

export = Participant;