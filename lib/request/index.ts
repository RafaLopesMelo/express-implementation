import { IncomingMessage } from 'http';

export interface Request extends IncomingMessage {
	query: Record<string, string>;
	body: Record<string, unknown> | undefined;
	method: string;
	url: string;

	params: Record<string, string>;
}
