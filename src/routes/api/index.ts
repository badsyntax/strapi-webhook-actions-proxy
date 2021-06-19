import { Router, Request, Response } from 'express';
import { ResponseBody, RequestBody, QueryParams } from './types';
export const indexRoute = Router();

indexRoute.post(
  '/',
  async (
    req: Request<null, ResponseBody, RequestBody, QueryParams>,
    res: Response<ResponseBody>
  ) => {
    const { DISPATCHES_ENDPOINT, GITHUB_TOKEN } = process.env;
    if (!DISPATCHES_ENDPOINT || !GITHUB_TOKEN) {
      throw new Error('Env not set correctly');
    }
    const { event_type: eventType } = req.query;
    if (!eventType) {
      return res.status(400).send('event_type param missing');
    }
    try {
      await fetch(DISPATCHES_ENDPOINT, {
        method: 'post',
        headers: new Headers({
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${GITHUB_TOKEN}`,
          ContentType: 'application/json',
        }),
        body: JSON.stringify({ event_type: eventType }),
      });
      res.status(200).send('Success');
    } catch (e) {
      const msg = 'Error calling actions endpoint';
      console.error(msg, e.message);
      res.status(500).send(msg);
    }
  }
);
