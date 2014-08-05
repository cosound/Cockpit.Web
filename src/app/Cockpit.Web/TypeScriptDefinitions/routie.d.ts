// Type definitions for routie 0.3.2
// Project: https://github.com/jgallen23/routie
// Definitions by: Adilson <https://github.com/Adilson>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface Route {
    constructor(path: string, name: string): Route;
    addHandler(fn: Function): void;
    removeHandler(fn: Function): void;
    run(params: any): void;
    match(path: string, params: any): boolean;
    toURL(params: any): string;
}

interface RouteStatic
{
	(path: string): void;
	(path: string, fn: Function): void;
	(routes: { [key: string]: Function }): void;
}

declare var routie:RouteStatic;


declare module "routie"
{
	export = routie;
}