import { RouteHandler } from '@lib';
import { IUsersRepository } from './users.repository';

type UserDto = {
	name: string;
};

export class UsersController {
	constructor(private readonly usersRepository: IUsersRepository) {}

	public fetchAll: RouteHandler = (request, response) => {
		response.send(200, this.usersRepository.fetchAll(request?.query?.sort));
	};

	public store: RouteHandler = (request, response) => {
		if (!request.body) throw new Error('Invalid request.');
		this.usersRepository.store(request.body as UserDto);
		response.send(200, { message: 'User created successfully!' });
	};

	public update: RouteHandler = (request, response) => {
		if (!request.body || !request.params.id)
			throw new Error('Invalid request.');

		this.usersRepository.update(
			Number(request.params.id),
			request.body as UserDto
		);
		response.send(200, { message: 'User updated successfully!' });
	};

	public delete: RouteHandler = (request, response) => {
		if (!request.params.id) throw new Error('Invalid request.');

		this.usersRepository.delete(Number(request.params.id));
		response.send(200, { message: 'User deleted successfully!' });
	};
}
