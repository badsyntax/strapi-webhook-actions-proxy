import express, { RequestHandler } from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import 'isomorphic-fetch';

dotenv.config();

const { GITHUB_TOKEN } = process.env;
if (!GITHUB_TOKEN) {
  throw new Error('Env not set correctly');
}

import { indexRoute } from './routes/api/index';

const app = express();

app.use(logger('dev') as RequestHandler);
app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: false }) as RequestHandler);

app.use('/api', indexRoute);

export default app;
