import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import { userRouter } from './routes/user.routes';
import { authRouter } from './routes/auth.routes';
import { indexRouter } from './routes/index.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(compression());

app.use('/api/', indexRouter);
app.use('/api/users/', userRouter);
app.use('/api/auth/', authRouter);

app.use((err: any, req: Request, res: Response) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  } else {
    res.status(500).json({ error: err.name + ': ' + err.message });
  }
});

export default app;
