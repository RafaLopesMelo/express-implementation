import { Router } from '@lib';
import { UsersController } from '../modules/users/users.controller';
import { usersRepository } from '../modules/users/users.repository';

const usersRouter = new Router();
const usersController = new UsersController(usersRepository);

usersRouter.get('/users', usersController.fetchAll);

export { usersRouter };
