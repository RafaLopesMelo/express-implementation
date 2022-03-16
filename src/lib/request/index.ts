import { IncomingMessage } from 'http';

export interface Request extends IncomingMessage {
	body: Record<string, unknown> | undefined;
	method: string;
	url: string;
}
