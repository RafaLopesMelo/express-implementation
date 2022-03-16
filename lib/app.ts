import http from 'http';
import { Middleware } from './middlewares/types';
import { Request } from './request';
import { Response } from './response';
import { Router } from './router';

export class App {
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
		return this.router.use(middleware);
	};

	public listen = (port: number, callback: () => void) => {
		const app = http.createServer(async (req, res) => {
			const response = new Response(res);
			const request = req as unknown as Request;
			return this.handle(request, response);
		});

		app.listen(port, callback);
	};

	public handle = (request: Request, response: Response) => {
		return this.router.handle(request, response);
	};
}
