import * as express from 'express';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  return res.json({ message: 'Welcome to My-app' });
});

export { router as indexRouter };
