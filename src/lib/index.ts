import { App } from './app';
import { Router } from './router';

export const server = () => {
	return new App(new Router());
};
