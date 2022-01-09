import User, { IUser } from '../models/user.model';

interface ICreateUserInput {
  email: IUser['email'];
  firstName: IUser['firstName'];
  lastName: IUser['lastName'];
}

async function createUser(input: ICreateUserInput): Promise<IUser> {
  return User.create(input);
}

export default {
  createUser,
};
