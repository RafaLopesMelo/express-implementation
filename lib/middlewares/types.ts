import { Request } from '../request';
import { Response } from '../response';

export type NextFunction = () => void;

export type Middleware = (
	request: Request,
	response: Response,
	next: NextFunction
) => void;

export type MiddlewareCollection = Middleware[];
