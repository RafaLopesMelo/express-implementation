import { UserCollection } from './types/user.type';

export interface IUsersRepository {
	fetchAll: () => UserCollection;
}

class UsersRepository implements UsersRepository {
	private users: UserCollection = [];

	fetchAll() {
		return this.users;
	}
}

export const usersRepository = new UsersRepository();
