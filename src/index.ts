import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import { todoRouter } from './routes/todo';

const app = express();
app.use(express.json());
app.use(logger('dev'));
app.use(todoRouter);

mongoose.connect('mongodb://localhost:27017/todo', () => {
  console.log('connected to database');
});

app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
