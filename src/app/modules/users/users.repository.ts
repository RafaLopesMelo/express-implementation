import { UserCollection } from './types/user.type';

export interface IUsersRepository {
	fetchAll: (sort?: string) => UserCollection;
	store: (user: { name: string }) => void;
	update: (id: number, user: { name: string }) => void;
	delete: (id: number) => void;
}

class UsersRepository implements UsersRepository {
	private users: UserCollection = [];

	fetchAll(sort?: string) {
		if (!sort || sort === 'asc') return this.users;
		return [...this.users].sort(
			(previous, current) => current.id - previous.id
		);
	}

	store({ name }: { name: string }) {
		const id = this.users.length
			? Math.max(...this.users.map(user => user.id)) + 1
			: 1;

		this.users.push({ id, name });
	}

	update(id: number, { name }: { name: string }) {
		const user = this.users.find(user => id === user.id);
		if (!user) throw new Error('User not found.');
		user.name = name;
	}

	delete(id: number) {
		this.users = this.users.filter(user => user.id !== id);
	}
}

export const usersRepository = new UsersRepository();
