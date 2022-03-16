import {
	Middleware,
	MiddlewareCollection,
	NextFunction
} from 'lib/middlewares/types';
import { Request } from 'lib/request';
import { Response } from 'lib/response';
import { queryParser } from 'lib/utils/query-parser.util';
import { HttpMethod } from './constants/http-method';
import { Route, RouteCollection, RouteHandler } from './types';

export class Router {
	private readonly middlewares: MiddlewareCollection = [];
	private readonly routes: RouteCollection = [];

	public get = (path: string, handler: RouteHandler) => {
		this.registerRoute({
			method: HttpMethod.GET,
			path,
			handler
		});

		return this;
	};

	public post = (path: string, handler: RouteHandler) => {
		this.registerRoute({
			method: HttpMethod.POST,
			path,
			handler
		});

		return this;
	};

	public put = (path: string, handler: RouteHandler) => {
		this.registerRoute({
			method: HttpMethod.PUT,
			path,
			handler
		});

		return this;
	};

	public delete = (path: string, handler: RouteHandler) => {
		this.registerRoute({
			method: HttpMethod.DELETE,
			path,
			handler
		});

		return this;
	};

	public patch = (path: string, handler: RouteHandler) => {
		this.registerRoute({
			method: HttpMethod.PATCH,
			path,
			handler
		});

		return this;
	};

	private registerRoute = (route: Route) => {
		this.routes.push(route);
	};

	public matchRoute(method: string, path: string): Route | undefined {
		return this.routes.find(
			route => route.method === method && route.path === path
		);
	}

	public use = (middleware: Router | Middleware) => {
		if (middleware instanceof Router) {
			this.routes.push(...middleware.routes);
			this.middlewares.push(...middleware.middlewares);
			return;
		}

		this.middlewares.push(middleware);
	};

	public handle = async (request: Request, response: Response) => {
		queryParser(request);

		const { method, url } = request;

		const route = this.matchRoute(method, url);

		if (!route)
			return response.send(404, {
				message: `Cannot ${method} ${url}`
			});

		for (const middleware of this.middlewares) {
			await new Promise(resolve => {
				const next = resolve as NextFunction;
				middleware(request, response, next);
			});
		}

		return route.handler(request, response);
	};
}
