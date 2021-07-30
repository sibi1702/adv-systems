import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import agendash from './routes/agendash';
import post from './routes/post';
import userprofile from './routes/userprofile';

// guaranteed to get dependencies
export default () => {

	const app = Router();
	auth(app);
	user(app);
	agendash(app);
         post(app);
	userprofile(app);
	return app
}