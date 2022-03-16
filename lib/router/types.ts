import { Request } from '../request';
import { Response } from '../response';
import { HttpMethod } from './constants/http-method';

export type RouteHandler = (request: Request, response: Response) => unknown;

export type Route = {
	method: HttpMethod;
	path: string;
	handler: RouteHandler;
};

export type RouteCollection = Route[];
