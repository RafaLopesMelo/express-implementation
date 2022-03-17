import { Router } from '@lib';
import { UsersController } from '../modules/users/users.controller';
import { usersRepository } from '../modules/users/users.repository';

const usersRouter = new Router();
const usersController = new UsersController(usersRepository);

usersRouter.get('/users', usersController.fetchAll);
usersRouter.post('/users', usersController.store);
usersRouter.put('/users/:id', usersController.update);
usersRouter.delete('/users/:id', usersController.delete);

export { usersRouter };
