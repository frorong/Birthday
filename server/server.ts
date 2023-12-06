import express, { Request, Response } from 'express';
import next from 'next';

import db from '../models';

const bodyParser = require('body-parser');

const { Member } = db;

db.sequelize.sync();

const dev = true;
const port = 3000;
const app = next({ dev, port });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  server.post('/api/birthday/create', async (req, res) => {
    const newBirthday = req.body;
    const birthday = await Member.create(newBirthday);
    res.send(birthday);
  });

  server.get('/api/birthday/list', async (req, res) => {
    const birthdays = await Member.findAll();
    res.send(birthdays);
  });

  server.get('/api/birthday/:id', async (req, res) => {
    const { id } = req.params;
    const birthday = await Member.findOne({ where: { id: id } });
    if (birthday) {
      res.send(birthday);
    } else {
      res.status(404).send({ message: '일치하는 id를 가진 생일이 없습니다.' });
    }
  });

  server.delete('/api/birthday/:id', async (req, res) => {
    const { id } = req.params;
    const deletedCount = await Member.destroy({ where: { id } });
    if (deletedCount) {
      res.send({ message: `${deletedCount}가 삭제되었습니다.` });
    } else {
      res.status(404).send({ message: '일치하는 id를 가진 생일이 없습니다.' });
    }
  });

  server.get('/api/healthcheck', (req: Request, res: Response) => {
    res.json({ test: '정상작동' });
  });

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(port, (err?: any) => {
    console.log('ready');
  });
});
