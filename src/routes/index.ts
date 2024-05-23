import * as express from 'express';
import { usersRouter } from '../routes/userRoutes';

const router = express.Router();

router.use('/api/users', usersRouter);
export { router };
