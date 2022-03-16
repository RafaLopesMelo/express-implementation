import { Middleware } from './types';

export const bodyParser: Middleware = (request, response, next) => {
	let body = '';

	request.on('data', (chunk: string) => {
		body += chunk;
	});

	request.on('end', () => {
		try {
			request.body = JSON.parse(body);
		} catch {
			request.body = undefined;
		}

		next();
	});
};
