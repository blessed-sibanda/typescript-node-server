import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import { todoRouter } from './routes/todo';
import { userRouter } from './routes/user.routes';

const app = express();
app.use(express.json());
app.use(logger('dev'));
app.use(todoRouter);
app.use('/api/users/', userRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  } else {
    res.status(500).json({ error: err.name + ': ' + err.message });
  }
});

export default app;
