import { ServerResponse } from 'http';

export class Response {
	constructor(private readonly serverResponse: ServerResponse) {}

	get write() {
		return this.serverResponse.write;
	}

	get send() {
		return (statusCode: number, body: unknown) => {
			this.serverResponse.writeHead(statusCode, {
				'Content-type': 'application/json'
			});
			return this.serverResponse.end(JSON.stringify(body));
		};
	}
}
