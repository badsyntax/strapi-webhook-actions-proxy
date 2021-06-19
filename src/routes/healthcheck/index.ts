import { Router, Request, Response } from 'express';
export const healthCheckRoute = Router();

healthCheckRoute.get('/', async (req: Request, res: Response) => {
  res.status(200).send('Healthy');
});
