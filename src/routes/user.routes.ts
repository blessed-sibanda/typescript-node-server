import userController from '../controllers/user.controller';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userController.createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });
    return res.json(user);
  } catch (err: any) {
    console.log(err);
    next(err);
  }
});

export { router as userRouter };
