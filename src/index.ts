import express from 'express';
import logger from 'morgan';
import { todoRouter } from './routes/todo';

const app = express();
app.use(express.json());
app.use(logger('dev'));
app.use(todoRouter);

app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
