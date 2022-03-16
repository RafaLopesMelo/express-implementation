import { router } from './app/routes';
import { server, bodyParser } from '@lib';

const app = server();

app.use(bodyParser);
app.use(router);

app.listen(3000, () =>
	console.log(`Server's running on http://localhost:3000`)
);
