import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { router } from './routes';
import connectDb from '../src/config/db';
import { errorHandler } from './middlewares/error';
import { Request } from 'express';
import cors from 'cors-ts';

const app = express();
connectDb();
app.set('trust proxy', true);
app.use(express.json());
app.use(morgan('dev'));

app.use(cors<Request>());

app.use(router);

app.use(errorHandler);

export { app };
