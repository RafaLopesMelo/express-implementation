import {
	Middleware,
	MiddlewareCollection,
	NextFunction
} from 'lib/middlewares/types';
import { Request } from 'lib/request';
import { Response } from 'lib/response';
import { HttpMethod } from './constants/http-method';
import { Route, RouteCollection, RouteHandler } from './types';
import { URL } from 'url';

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

	public matchRoute(request: Request): Route | undefined {
		const { method, url: path } = request;

		const parsedPath = this.splitPath(path);

		return this.routes.find(route => {
			if (route.method !== method) return false;

			const parsedRoutePath = this.splitPath(route.path);

			if (parsedPath.length !== parsedRoutePath.length) return false;

			for (let i = 0; i < parsedPath.length; i++) {
				if (parsedRoutePath[i].charAt(0) === ':') {
					const key = parsedRoutePath[i].substring(1);
					request.params[key] = parsedPath[i];
					continue;
				}

				if (parsedPath[i] === parsedRoutePath[i]) continue;
			}

			return true;
		});
	}

	private splitPath = (path: string) =>
		path.charAt(0) === '/' ? path.substring(1).split('/') : path.split('/');

	public use = (middleware: Router | Middleware) => {
		if (middleware instanceof Router) {
			this.routes.push(...middleware.routes);
			this.middlewares.push(...middleware.middlewares);
			return;
		}

		this.middlewares.push(middleware);
	};

	public handle = async (request: Request, response: Response) => {
		this.parseQueryParams(request);

		const { method, url } = request;

		const route = this.matchRoute(request);

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

	private parseQueryParams = (request: Request) => {
		const url = new URL(`http://${request.headers.host}${request.url}`);
		request.query = Object.fromEntries(url.searchParams);
		request.url = url.pathname;
	};
}
