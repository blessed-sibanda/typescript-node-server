import express, { Request, Response } from 'express';
import { Todo } from '../models/todo';

const router = express.Router();

router.get('/api/todo', async (req: Request, res: Response) => {
  const todo = await Todo.find({});
  return res.send(todo);
});

router.post('/api/todo', async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const todo = Todo.build({ title, description });
  try {
    await todo.save();
    return res.status(201).send(todo);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

export { router as todoRouter };
