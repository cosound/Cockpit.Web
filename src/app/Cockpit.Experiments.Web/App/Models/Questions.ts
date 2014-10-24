import CockpitPortal = require("CockpitPortal");

export interface IBooleanQuestion extends CockpitPortal.IQuestion
{
	Value: string;
}

export interface IABQuestion extends CockpitPortal.IQuestion
{
	Text: string;
	Url1: string;
	Url2: string;
}