import knockout = require("knockout");
import Notification = require("Managers/Notification");
import Portal = require("Managers/Portal");
import Title = require("Managers/Title");

class Search
{
	constructor()
	{
		Title.ToDefault("Search");
	}
}

export = Search;