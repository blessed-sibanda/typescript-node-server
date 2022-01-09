import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import crypto from 'crypto';
import { IDocument, Document, CollectionFactory } from 'document-ts';
import { AggregationCursor, ObjectId } from 'mongodb';

export interface IUser extends IDocument {
  name: string;
  email: string;
}

export class User extends Document<IUser> implements IUser {
  static collectionName = 'users';
  name!: string;
  email!: string;
  private password?: string;
  private salt!: string;

  protected getCalculatedPropertiesToInclude(): string[] {
    return [];
  }

  protected getPropertiesToExclude(): string[] {
    return ['password', 'salt'];
  }

  constructor(user?: Partial<IUser>) {
    super(User.collectionName, user);
  }

  protected fillData(data?: Partial<IUser>): void {
    if (data) {
      Object.assign(this, data);
    }
  }

  private hashPassword(newPassword: string): string {
    return crypto.createHmac('sha1', this.salt).update(newPassword).digest('hex');
  }

  async resetPassword(newPassword: string) {
    this.password = await this.hashPassword(newPassword);
    await this.save();
  }

  comparePassword(password: string): boolean {
    return this.hashPassword(password) === this.password;
  }

  hasSameId(id: ObjectId) {
    return this._id.toHexString() === id.toHexString();
  }

  async create(password: string) {
    this.salt = uuid();
    this.password = this.setPassword(password);
    await this.save();
  }
}

class UserCollectionFactory extends CollectionFactory<User> {
  constructor(docType: typeof User) {
    super(User.collectionName, docType, ['name', 'email']);
  }

  async createIndexes() {
    await this.collection().createIndexes([
      {
        key: { email: 1 },
        unique: true,
      },
      {
        key: {
          name: 'text',
          email: 'text',
        },
        weights: {
          name: 1,
          email: 1,
        },
        name: 'TextIndex',
      },
    ]);
  }

  userSearchQuery(
    searchText: string,
  ): AggregationCursor<{ _id: ObjectId; email: string }> {
    const aggregateQuery = [
      {
        $match: {
          $text: { $search: searchText },
        },
      },
      {
        $project: { email: 1 },
      },
    ];
    if (searchText === undefined || searchText === '') {
      delete (aggregateQuery[0] as any).$match?.$text;
    }
    return this.collection().aggregate(aggregateQuery);
  }
}

export let UserCollection = new UserCollectionFactory(User);
