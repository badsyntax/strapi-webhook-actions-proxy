import { Router, Request, Response } from 'express';
import { ResponseBody, RequestBody, QueryParams } from './types';
export const indexRoute = Router();

indexRoute.post(
  '/',
  async (
    req: Request<null, ResponseBody, RequestBody, QueryParams>,
    res: Response<ResponseBody>
  ) => {
    const { event_type: eventType, repo } = req.query;
    if (!eventType) {
      return res.status(400).send('event_type param missing');
    }
    if (!repo) {
      return res.status(400).send('repo param missing');
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
      ).then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      });
      res.status(200).send('Success');
    } catch (e) {
      const msg = 'Error calling actions endpoint';
      console.error(`${msg}:`, e.message);
      res.status(500).send(msg);
    }
  }
);
