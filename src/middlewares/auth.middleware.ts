import { check } from 'express-validator';

export class AuthValidation {
  static login = [
    check('email')
      .notEmpty()
      .withMessage('E-mail address is required')
      .isEmail()
      .withMessage('Provide a valid email address'),
    check('password').notEmpty().withMessage('Password is required'),
  ];
}
