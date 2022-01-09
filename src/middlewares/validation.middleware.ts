import { Request, Response, NextFunction } from 'express';

import { validationResult } from 'express-validator';

export const validateReq = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let result: { [index: string]: string[] } = {};
    errors.array().forEach((obj) => {
      if (!result[obj.param]) result[obj.param] = obj.msg;
    });
    return res.status(400).json({ errors: result });
  }
  next();
};
