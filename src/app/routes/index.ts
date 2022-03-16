import { Router } from '../../lib/router';
import { usersRouter } from './users.router';

const router = new Router();

router.use(usersRouter);

export { router };
