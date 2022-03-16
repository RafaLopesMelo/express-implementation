import { HttpMethod } from './constants/http-method';
import { Route, RouteCollection, RouteHandler } from './types';

export class Router {
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

	public use = (router: Router) => {
		this.routes.push(...router.routes);
	};
}
