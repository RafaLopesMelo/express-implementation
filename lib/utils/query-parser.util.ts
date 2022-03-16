import { Request } from 'lib/request';
import { URL } from 'url';

export const queryParser = (request: Request) => {
	const url = new URL(`http://${request.headers.host}${request.url}`);
	request.query = Object.fromEntries(url.searchParams);
	request.url = url.pathname;
};
