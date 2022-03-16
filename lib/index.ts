import { App } from './app';
import { bodyParser } from './middlewares/body-parser.middleware';
import { Router } from './router';
import { Route, RouteCollection, RouteHandler } from './router/types';

export { Router, Route, RouteCollection, RouteHandler, bodyParser };

export const server = () => {
	return new App(new Router());
};
