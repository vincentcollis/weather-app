import express from 'express';
import dotenvx from '@dotenvx/dotenvx';
dotenvx.config();
import apiRouter from './routers/apiRouter.js';

const app = express();
const PORT = 8080;

import cors from 'cors';
const corsOptions = {
  origin: ['http://localhost:5173/'],
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', apiRouter);

app.use('/', (err, req, res, next) => {
  const defaultError = {
    log: 'Global Error Handler',
    message: { err },
    status: 500,
  };

  const errorObj = Object.assign(defaultError, err);

  //   console.log('Global Error Catch: ', errorObj.log);

  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
