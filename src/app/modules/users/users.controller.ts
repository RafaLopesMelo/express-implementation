import { RouteHandler } from '../../../../lib/router/types';
import { IUsersRepository } from './users.repository';

export class UsersController {
	constructor(private readonly usersRepository: IUsersRepository) {}

	public fetchAll: RouteHandler = (request, response) => {
		const data: unknown[] = [];
		response.send(200, data);
	};
}
