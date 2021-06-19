import { Router, Request, Response } from 'express';
import { ResponseBody, RequestBody, QueryParams } from './types';
export const apiRoute = Router();

apiRoute.post(
  '/',
  async (
    req: Request<null, ResponseBody, RequestBody, QueryParams>,
    res: Response<ResponseBody>
  ) => {
    const { event_type: eventType, repo } = req.query;
    try {
      if (!eventType) {
        throw new Error('event_type param missing');
      }
      if (!repo) {
        throw new Error('repo param missing');
      }
    } catch (e) {
      return res.status(400).send(e.message);
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repo}/dispatches`,
        {
          method: 'post',
          headers: new Headers({
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
            ContentType: 'application/json',
          }),
          body: JSON.stringify({
            event_type: eventType,
            client_payload: req.body,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      res.status(200).send('Success');
    } catch (e) {
      const msg = 'Error calling actions endpoint';
      console.error(`${msg}:`, e.message);
      res.status(500).send(msg);
    }
  }
);
