import express, { RequestHandler } from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import 'isomorphic-fetch';

dotenv.config();

import { indexRoute } from './routes/api/index';

const app = express();

app.use(logger('dev') as RequestHandler);
app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: false }) as RequestHandler);

app.use('/api', indexRoute);

export default app;
