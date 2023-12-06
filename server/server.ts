import express, { Request, Response } from 'express';
import { createServer } from 'http';
import next from 'next';
import { parse } from 'url';

const dev = true;
const port = 3000;
const app = next({ dev, port });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/test', (req: Request, res: Response) => {
    res.json({ test: '테스트' });
  });

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(port, (err?: any) => {
    console.log('ready');
  });
});
