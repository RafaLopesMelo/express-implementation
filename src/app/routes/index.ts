import { Router } from '../../../lib';
import { usersRouter } from './users.router';

const router = new Router();

router.use(usersRouter);

export { router };
