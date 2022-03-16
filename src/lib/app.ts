import http from 'http';
import {
	Middleware,
	MiddlewareCollection,
	NextFunction
} from './middlewares/types';
import { Request } from './request';
import { Response } from './response';
import { Router } from './router';

export class App {
	private middlewares: MiddlewareCollection = [];

	constructor(private readonly router: Router) {}

	get get() {
		return this.router.get;
	}

	get post() {
		return this.router.post;
	}

	get put() {
		return this.router.put;
	}

	get delete() {
		return this.router.delete;
	}

	get patch() {
		return this.router.patch;
	}

	public use = (middleware: Router | Middleware) => {
		if (middleware instanceof Router) return this.router.use(middleware);
		this.middlewares.push(middleware);
	};

	public listen = (port: number, callback: () => void) => {
		const app = http.createServer(async (req, res) => {
			const response = new Response(res);

			const request = req as Request;

			for (const middleware of this.middlewares) {
				await new Promise(resolve => {
					const next = resolve as NextFunction;
					middleware(request, response, next);
				});
			}

			return this.handle(request, response);
		});

		app.listen(port, callback);
	};

	public handle = (request: Request, response: Response) => {
		const { method, url } = request;

		const route = this.router.matchRoute(method, url);

		if (!route)
			return response.send(404, {
				message: `Cannot ${method} ${url}`
			});

		return route.handler(request, response);
	};
}
