import { Router, Request, Response, NextFunction } from 'express';
import { AuthValidation } from '../middlewares/auth.middleware';
import { validateReq } from '../middlewares/validation.middleware';
import { IUser } from '../models/user.model';
import config from '../config';
import * as jwt from 'jsonwebtoken';

const router = Router();

const createJwt = async (user: IUser) => {
  const payload = { email: user.email, id: user._id };
  const token = await jwt.sign(payload, config.jwtSecret, {
    subject: user._id.toString(),
    expiresIn: '3d',
  });
  return token;
};

router.post(
  '/login',
  AuthValidation.login,
  validateReq,
  async (req: Request, res: Response) => {
    return res.json({ message: 'succcess' });
  },
);

export { router as authRouter };
