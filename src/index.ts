import { router } from './app/routes';
import { server } from '../lib';
import { bodyParser } from '../lib/middlewares/body-parser.middleware';

const app = server();

app.use(bodyParser);
app.use(router);

app.listen(3000, () =>
	console.log(`Server's running on http://localhost:3000`)
);
