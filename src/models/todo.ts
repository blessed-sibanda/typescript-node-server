import mongoose from 'mongoose';

interface ITodo {
  title: string;
  description: string;
}

interface ITodoDoc extends mongoose.Document {
  title: string;
  description: string;
}

interface ITodoModel extends mongoose.Model<ITodoDoc> {
  build(attr: ITodo): ITodoDoc;
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

todoSchema.statics.build = (attr: ITodo) => new Todo(attr);

const Todo = mongoose.model<ITodoDoc, ITodoModel>('Todo', todoSchema);

Todo.build({
  title: 'some title',
  description: 'some description',
});

export { Todo };
